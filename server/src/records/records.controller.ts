import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,

} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';
import { RecordsService } from './records.service';
import { ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('records')

export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createRecordDto: CreateRecordDto,file?: Express.Multer.File): Promise<Record> {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  findAll(): Promise<Record[]> {
    return this.recordsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Record,
  })

  findOne(@Param('id', ParseIntPipe) id: number): Promise<Record> {
    return this.recordsService.findOne(id);
  }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.recordService.remove(id);
//   }
}
