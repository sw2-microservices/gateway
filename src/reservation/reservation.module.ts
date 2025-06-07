import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ReservationController],
  imports: [
    NatsModule
  ],
})
export class ReservationModule { }
