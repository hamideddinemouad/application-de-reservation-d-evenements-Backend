import { EventStatus } from "../event.entity";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @Type(() => Date)
  @IsDate()
  startsAt: Date;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
