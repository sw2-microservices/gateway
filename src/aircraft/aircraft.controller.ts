import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('aircraft')
export class AircraftController {
  constructor() {}

  @Post()
  createAircraft() {
    return { message: 'Aircraft created successfully' };
  }

  @Get()
  findAllAircrafts() {
    return { message: 'List of aircraft' };
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
