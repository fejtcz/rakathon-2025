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
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';
import { RecordsService } from './records.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerStorage = diskStorage({
  destination: './uploads', // sem to uložíš
  filename: (req, file, callback) => {
    const ext = extname(file.originalname);
    const uuid = uuidv4();
    const filename = `${uuid}${ext}`;
    callback(null, filename);
  },
});

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Record,
  })
  @ApiBody({
    description: 'File and data to be uploaded',
    type: CreateRecordDto,
  })
  @UseInterceptors(FileInterceptor('file', { storage: multerStorage }))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string): Promise<Record> {
    let createRecordDto = JSON.parse(data);
    createRecordDto.filename = file.filename;
    console.log('File uploaded:', file);
    console.log('Data:', createRecordDto);
    return this.recordsService.create(createRecordDto);
  }

  //   {
  //   const parsed = JSON.parse(jsonData);
  //   console.log(file.originalname, parsed);
  //   return { message: 'Success' };
  // }
  // @Post()
  // create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
  //   return this.recordsService.create(createRecordDto);
  // }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all records',
    type: [Record],
  })
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


  @Get('/meeting/:meetingId')
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [Record],
  })
  findByMeeting(@Param('meetingId', ParseIntPipe) meetingId: number): Promise<Record[]> {
    return this.recordsService.findByMeeting(meetingId);
  }

  @Get('/case/:caseId')
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [Record],
  })
  findByCase(@Param('caseId', ParseIntPipe) caseId: number): Promise<Record[]> {
    return this.recordsService.findByCase(caseId);
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
    const record = await this.recordsService.findOne(id);
    const filePath = path.join(__dirname, '..', '..', '..', 'uploads', record.filename);
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (err) => {
      res.status(404).send({ message: 'File not found' });
    });

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${record.filename}"`,
    });

    fileStream.pipe(res);
  }
  //   @Delete(':id')
  //   remove(@Param('id') id: string): Promise<void> {
  //     return this.recordService.remove(id);
  //   }
}
