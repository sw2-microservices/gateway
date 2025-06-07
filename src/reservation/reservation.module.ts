import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, RESERVATION_SERVICE } from 'src/config';

@Module({
  controllers: [ReservationController],
  imports: [
    ClientsModule.register([
      {
        name: RESERVATION_SERVICE,
        transport: Transport.TCP,
        options: {
          // host: envs.reservationMicroserviceHost,
          // port: envs.reservationMicroservicePort,
        },
      },
    ]),
  ],
})
export class ReservationModule {}
