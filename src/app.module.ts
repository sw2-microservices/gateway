import { Module } from '@nestjs/common';
import { AircraftModule } from './aircraft/aircraft.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AircraftModule, OrdersModule],
})
export class AppModule {}
