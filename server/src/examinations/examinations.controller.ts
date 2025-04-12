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
  Res

} from '@nestjs/common';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { Examination } from './examination.entity';
import { ExaminationsService } from './examinations.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerStorage = diskStorage({
  destination: './exams', 
  filename: (req, file, callback) => {
    const ext = extname(file.originalname);
    const uuid = uuidv4();
    const filename = `${uuid}${ext}`;
    callback(null, filename);
  },
});

@Controller('examinations')
export class ExaminationsController {
  constructor(private readonly examinationsService: ExaminationsService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Examination,
  })
  @ApiBody({
    description: 'File and data to be uploaded',
    type: CreateExaminationDto,
  })
  @UseInterceptors(FileInterceptor('file', { storage: multerStorage }))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string): Promise<Examination> {
    let createRecordDto = JSON.parse(data);
    createRecordDto.result = file.filename;
    console.log('File uploaded:', file);
    console.log('Data:', createRecordDto);
    return this.examinationsService.create(createRecordDto);
  }

  //   {
  //   const parsed = JSON.parse(jsonData);
  //   console.log(file.originalname, parsed);
  //   return { message: 'Success' };
  // }
  // @Post()
  // create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
  //   return this.examinationsService.create(createRecordDto);
  // }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all examinations',
    type: [Examination],
  })
  findAll(): Promise<Examination[]> {
    return this.examinationsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Examination,
  })

  findOne(@Param('id', ParseIntPipe) id: number): Promise<Examination> {
    return this.examinationsService.findOne(id);
  }
  
  @Get('/case/:caseId')
  @ApiResponse({
    status: 200,
    description: 'The found examinations',
    type: [Examination],
  })
  findByCase(@Param('caseId', ParseIntPipe) caseId: number): Promise<Examination[]> {
    return this.examinationsService.findByCase(caseId);
  }


  @Get('file/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  async getFile(@Param('id', ParseIntPipe) id: number, @Res() res): Promise<void> {
    const record = await this.examinationsService.findOne(id);
    const filePath = path.join(__dirname, '..', '..', '..', 'uploads', record.result);
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (err) => {
      res.status(404).send({ message: 'File not found' });
    });

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${record.result}"`,
    });

    fileStream.pipe(res);
  }
  //   @Delete(':id')
  //   remove(@Param('id') id: string): Promise<void> {
  //     return this.recordService.remove(id);
  //   }
}
