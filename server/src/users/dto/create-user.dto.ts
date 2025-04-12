import { IsString, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsArray()
  @IsString({ each: true })
  specializations?: string[];
}
