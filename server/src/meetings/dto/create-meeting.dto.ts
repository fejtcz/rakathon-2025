import { IsString, IsDateString, IsArray, IsNumber } from 'class-validator';
import { Timestamp } from 'typeorm';
import { Case } from '../../cases/case.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingDto {

  @IsArray()
  @IsNumber()
  cases: Case[];

  @IsNumber()
  mdt: number;

  @IsDateString()
  plannedDate: Date;

  @IsNumber()
  responsibleId: number;


}
