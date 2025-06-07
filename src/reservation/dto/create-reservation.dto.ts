import { IsString, IsEmail, IsOptional, IsUUID, IsEnum } from 'class-validator';

export enum ReservationStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  CHECKED_IN = 'CHECKED_IN'
}

export class CreateReservationDto {
  @IsString()
  @IsUUID()
  public flight_id: string;

  @IsString()
  public passenger_name: string;

  @IsString()
  public passenger_lastname: string;

  @IsString()
  public document_number: string;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  public seat_number?: string;

  @IsOptional()
  @IsEnum(ReservationStatus)
  public status?: ReservationStatus;
}
