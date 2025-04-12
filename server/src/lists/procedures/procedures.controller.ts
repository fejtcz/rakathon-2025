import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Procedure } from './procedures.entity';
import { ProceduresService } from './procedures.service';

@Controller('procedures')
export class ProceduresController { 
 constructor(private readonly ProceduresService: ProceduresService) {}

 @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of procedures has been successfully retrieved.',
    type: [Procedure],
  })
  findAll(): Promise<Procedure[]> {
    return this.ProceduresService.findAll();
  }

}

//import { CreateUserDto } from './dto/create-user.dto';
