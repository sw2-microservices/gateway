import { Module } from '@nestjs/common';
import { AircraftController } from './aircraft.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [AircraftController],
  imports: [
    NatsModule
  ],
})
export class AircraftModule {}
