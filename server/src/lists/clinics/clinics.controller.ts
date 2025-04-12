import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Clinic } from './clinic.entity';
import { ClinicsService } from './clinics.service';

@Controller('clinics')
export class ClinicsController { 
 constructor(private readonly clinicService: ClinicsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of clinics.', type: [Clinic] })
  findAll(): Promise<Clinic[]> {
    return this.clinicService.findAll();
  }

}

//import { CreateUserDto } from './dto/create-user.dto';
