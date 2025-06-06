import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { AIRCRAFT_SERVICE } from 'src/config';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';

@Controller('aircraft')
export class AircraftController {
  constructor(
    @Inject(AIRCRAFT_SERVICE) private readonly aircraftClient: ClientProxy,
  ) {}

  @Post()
  createAircraft(@Body() createAircraftDto: CreateAircraftDto) {
    return this.aircraftClient.send({ cmd: 'create_aircraft' }, createAircraftDto);
  }

  @Get()
  async findAllAircrafts(@Query() paginationDto: PaginationDto) {
    return this.aircraftClient.send({ cmd: 'find_all_aircrafts' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      const aircraft = await firstValueFrom(
        this.aircraftClient.send({ cmd: 'find_one_aircraft' }, { id })
      );

      return aircraft;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  removeAircraft(@Param('id') id: string) {
    return this.aircraftClient.send({ cmd: 'remove_aircraft' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Patch(':id')
  patchAircraft(@Param('id', ParseUUIDPipe) id: string, @Body() updateAircraftDto: UpdateAircraftDto) {
    return this.aircraftClient.send({ cmd: 'update_aircraft' }, { id, ...updateAircraftDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }
}
