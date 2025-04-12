import { IsString, IsDateString, IsArray, IsNumber, IsObject } from 'class-validator';
import { Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the meeting' })
  meetingId: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the meeting' })
  caseId: number;
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of creating user' })
  createdById: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of responsible user' })
  createdForId: number;

  @IsDateString()
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', description: 'Datetime of creation' })
  created: Date;

  @IsDateString()
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', description: 'Datetime of deadline' })
  deadline: Date;

  @IsObject()
  @ApiProperty({ example: 'objednat pacienta na PET/CT', description: 'Text úkolu' })
  note: string;

}

