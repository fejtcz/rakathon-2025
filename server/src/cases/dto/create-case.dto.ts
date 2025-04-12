import { IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseDto {
  
  @ApiProperty({ example: '1', description: 'ID of the user that is responsible for this case' })
  @IsNumber()
  responsibleId: number;

  @ApiProperty({ example: '1', description: 'ID of the MDT' })
  @IsNumber()
  mdtId: number;
  
  @ApiProperty({ example: 'Jan', description: 'Jméno' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Novák', description: 'Příjmení' })
  @IsString()
  surname: string;
  
  @ApiProperty({ example: '1234560472', description: 'RodnéČíslo' })
  @IsString()
  regNumber: string;
}
