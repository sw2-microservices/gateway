import { Body, Controller, Get, Inject, Post, Req, UseGuards, Logger, BadRequestException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto, RegisterSubscriptionDto, LoginAirlineDto } from './dto';
import { catchError, throwError } from 'rxjs';
import { User, Token } from './decorators';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');
  
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    this.logger.log('Attempting to register user');
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        this.logger.error('Error in register user:', error);
        throw new RpcException(error);
      }),
    );
  }
  
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    this.logger.log('Attempting user login');
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        this.logger.error('Error in login user:', error);
        throw new RpcException(error);
      }),
    );
  }
  @Post('register-subscription')
  registerSubscription(@Body() registerSubscriptionDto: RegisterSubscriptionDto) {
    this.logger.log('Attempting to register subscription');
    this.logger.debug('Subscription data:', JSON.stringify(registerSubscriptionDto, null, 2));
    
    return this.client.send('auth.register.subscription', registerSubscriptionDto).pipe(
      catchError((error) => {
        this.logger.error('Error in register-subscription:', error);
        this.logger.error('Error details:', JSON.stringify(error, null, 2));
        
        // Si el error tiene un mensaje específico, usarlo
        if (error?.message) {
          throw new BadRequestException({
            status: 'error',
            message: error.message,
            details: error?.details || 'Error en el registro de suscripción'
          });
        }
        
        // Si no, lanzar el error original con más información
        throw new BadRequestException({
          status: 'error', 
          message: 'Error al procesar la suscripción',
          details: error,
          originalError: error
        });
      }),
    );
  }

  @Post('login-airline')
  loginAirline(@Body() loginAirlineDto: LoginAirlineDto) {
    this.logger.log('Attempting airline login');
    this.logger.debug('Login data:', { admin_email: loginAirlineDto.admin_email });
    
    return this.client.send('auth.login.airline', loginAirlineDto).pipe(
      catchError((error) => {
        this.logger.error('Error in login-airline:', error);
        this.logger.error('Error details:', JSON.stringify(error, null, 2));
        
        if (error?.message) {
          throw new BadRequestException({
            status: 'error',
            message: error.message,
            details: error?.details || 'Error en el login de aerolínea'
          });
        }
        
        throw new BadRequestException({
          status: 'error',
          message: 'Error al procesar el login',
          details: error,
          originalError: error
        });
      }),
    );
  }

  @UseGuards( AuthGuard )
  @Get('verify')
  verifyToken( @User() user: CurrentUser, @Token() token: string  ) {
    // const user = req['user'];
    // const token = req['token'];
    // return this.client.send('auth.verify.user', {});
    return { user, token }
  }

  @Get('health')
  healthCheck() {
    this.logger.log('Health check requested');
    return { 
      status: 'ok', 
      message: 'Auth controller is working',
      timestamp: new Date().toISOString()
    };
  }

  @Get('test-connection')
  testConnection() {
    this.logger.log('Testing NATS connection');
    return this.client.send('auth.verify.user', 'test-token').pipe(
      catchError((error) => {
        this.logger.error('NATS connection error:', error);
        return throwError(() => new BadRequestException({
          status: 'error',
          message: 'Error connecting to auth microservice',
          details: error
        }));
      }),
    );
  }
}