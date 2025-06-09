import { Module } from '@nestjs/common';
import { AircraftModule } from './aircraft/aircraft.module';
import { OrdersModule } from './orders/orders.module';
import { ReservationModule } from './reservation/reservation.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [AircraftModule, OrdersModule, ReservationModule, NatsModule, AuthModule, HealthCheckModule],
})
export class AppModule {}
