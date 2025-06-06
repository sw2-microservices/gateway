import { Module } from '@nestjs/common';
import { AircraftController } from './aircraft.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AIRCRAFT_SERVICE, envs } from 'src/config';

@Module({
  controllers: [AircraftController],
  imports: [
    ClientsModule.register([
      {
        name: AIRCRAFT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.aircraftMicroserviceHost,
          port: envs.aircraftMicroservicePort,
        },
      }
    ])
  ],
})
export class AircraftModule {}
