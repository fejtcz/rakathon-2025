import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMdtDto } from './dto/create-mdt.dto';
import { Mdt } from './mdt.entity';
import { MdtService } from './mdt.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('mdts')

export class MdtController {
  constructor(private readonly mdtService: MdtService) {}

  @Post()
  create(@Body() createMdtDto: CreateMdtDto): Promise<Mdt> {
    return this.mdtService.create(createMdtDto);
  }

  @Get()
  findAll(): Promise<Mdt[]> {
    return this.mdtService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Mdt,
  })

  findOne(@Param('id', ParseIntPipe) id: number): Promise<Mdt> {
    return this.mdtService.findOne(id);
  }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.mdtService.remove(id);
//   }
}
