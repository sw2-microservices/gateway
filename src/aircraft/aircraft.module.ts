import { Module } from '@nestjs/common';
import { AircraftController } from './aircraft.controller';

@Module({
  controllers: [AircraftController],
})
export class AircraftModule {}
