import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Diagnosis } from './diagnosis.entity';
import { DiagnosisService } from './diagnosis.service';

@Controller('diagnosis')
export class DiagnosisController { 
 constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of diagnoses.', type: [Diagnosis] })
  findAll(): Promise<Diagnosis[]> {
    return this.diagnosisService.findAll();
  }

}

//import { CreateUserDto } from './dto/create-user.dto';
