import { PartialType } from '@nestjs/mapped-types';
import { CreateAircraftDto } from './create-aircraft.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateAircraftDto extends PartialType(CreateAircraftDto) {}
