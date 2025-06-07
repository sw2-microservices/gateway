import { Module } from '@nestjs/common';
import { AircraftModule } from './aircraft/aircraft.module';
import { OrdersModule } from './orders/orders.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [AircraftModule, OrdersModule, ReservationModule],
})
export class AppModule {}
