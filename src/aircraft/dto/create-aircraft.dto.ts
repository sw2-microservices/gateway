import { IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAircraftDto {
  @IsString()
  public model: string;

  @IsString()
  public registration: string;

  @Type(() => Number)
  @IsInt()
  public seats_total: number;

  @IsOptional()
  public configuration?: any;
}
