import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateMdtDto {
  
  @IsNumber()
  leaderId: number;
  
  @IsString()
  name: string;
  
  @IsArray()
  @IsNumber()
  members?: number[];
}
