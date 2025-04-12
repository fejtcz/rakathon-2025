import { IsString, IsDateString, IsArray, IsNumber, IsObject } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateRecordDto {
  
  @IsNumber()
  meetingId: number;

  @IsNumber()
  uploadedById: number;

  @IsDateString()
  timestamp: Date;

  @IsObject()
  transcription: Object;
}
