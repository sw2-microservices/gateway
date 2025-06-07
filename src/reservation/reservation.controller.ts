import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe,
  Query,
  Inject
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PaginationDto } from '../common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';


@Controller('reservation')
export class ReservationController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.client.send({ cmd: 'create_reservation' }, createReservationDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_reservations' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'find_one_reservation' }, { id });
  }

  @Get('code/:reservationCode')
  findByReservationCode(@Param('reservationCode') reservationCode: string) {
    return this.client.send({ cmd: 'find_reservation_by_code' }, { reservationCode });
  }

  @Get('flight/:flightId')
  findByFlightId(
    @Param('flightId', ParseUUIDPipe) flightId: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send({ cmd: 'find_reservations_by_flight' }, { flightId, paginationDto });
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateReservationDto: UpdateReservationDto
  ) {
    return this.client.send({ cmd: 'update_reservation' }, { ...updateReservationDto, id });
  }

  @Patch(':id/checkin')
  checkIn(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'checkin_reservation' }, { id });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'remove_reservation' }, { id });
  }
}
