import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { Case } from './case.entity';
import { CasesService } from './cases.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cases')

export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto): Promise<Case> {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  findAll(): Promise<Case[]> {
    return this.casesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Case,
  })

  findOne(@Param('id', ParseIntPipe) id: number): Promise<Case> {
    return this.casesService.findOne(id);
  }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.caseService.remove(id);
//   }
}
