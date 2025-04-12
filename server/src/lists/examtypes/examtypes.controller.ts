import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ExamType } from './examtype.entity';
import { ExamTypesService } from './examtypes.service';

@Controller('examTypes')
export class ExamTypesController { 
 constructor(private readonly examTypeService: ExamTypesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of examtypes.', type: [ExamType] })
  findAll(): Promise<ExamType[]> {
    return this.examTypeService.findAll();
  }

}

//import { CreateUserDto } from './dto/create-user.dto';
