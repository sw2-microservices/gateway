import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';
import { AIRCRAFT_SERVICE } from 'src/config';

@Controller('aircraft')
export class AircraftController {
  constructor(
    @Inject(AIRCRAFT_SERVICE) private readonly aircraftClient: ClientProxy,
  ) {}

  @Post()
  createAircraft() {
    return { message: 'Aircraft created successfully' };
  }

  @Get()
  findAllAircrafts(@Query() paginationDto: PaginationDto) {
    return this.aircraftClient.send({ cmd: 'find_all_aircrafts' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { message: `Details of aircraft with id ${id}` };
  }

  @Delete(':id')
  deleteAircraft(@Param('id') id: string) {
    return { message: `Aircraft with id ${id} deleted successfully` };
  }

  @Patch(':id')
  patchAircraft(@Param('id') id: string, @Body() body: any) {
    return { message: `Aircraft with id ${id} updated successfully`, data: body };
  }
}
