import { Module } from '@nestjs/common';
import { AircraftModule } from './aircraft/aircraft.module';
import { OrdersModule } from './orders/orders.module';
import { ReservationModule } from './reservation/reservation.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [AircraftModule, OrdersModule, ReservationModule, NatsModule],
})
export class AppModule {}
