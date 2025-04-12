import { IsString, IsDateString, IsArray, IsNumber, IsObject } from 'class-validator';
import { Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExaminationDto {
  
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of uploading user' })
  uploadedById: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of discussed case' })
  caseId: number;

  @IsDateString()
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', description: 'Datetime of result' })
  timestamp: Date;

  @IsObject()
  @ApiProperty({ example: { flow: [{speaker: 1, text: 'vitejte' }]}, description: 'Data of transcription' })
  transcription: Object;

  @IsString()
  @ApiProperty({ example: 'result.pdf', description: 'Filename of result' })
  result: string;

}
