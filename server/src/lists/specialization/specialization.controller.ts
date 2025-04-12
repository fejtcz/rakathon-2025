import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Specialization } from './specialization.entity';
import { SpecializationService } from './specialization.service';

@Controller('specialization')
export class SpecializationController { 
 constructor(private readonly specializationService: SpecializationService) {}

 @Get()
 @ApiResponse({ status: 200, description: 'Retrieve all specializations' })
  findAll(): Promise<Specialization[]> {
    return this.specializationService.findAll();
  }

}

//import { CreateUserDto } from './dto/create-user.dto';
