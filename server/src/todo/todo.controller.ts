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
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';
// import * as fs from 'fs';
// import * as path from 'path';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { v4 as uuidv4 } from 'uuid';

// const multerStorage = diskStorage({
//   destination: './uploads', // sem to uložíš
//   filename: (req, file, callback) => {
//     const ext = extname(file.originalname);
//     const uuid = uuidv4();
//     const filename = `${uuid}${ext}`;
//     callback(null, filename);
//   },
// });

@Controller('todo')
export class TodoController {
  constructor(private readonly todosService: TodoService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
    type: Todo,
  })
  @ApiBody({
    description: 'File and data to be uploaded',
    type: CreateTodoDto,
  })
  // @UseInterceptors(FileInterceptor('file', { storage: multerStorage }))
  // upload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body('data') data: string): Promise<Todo> {
  //   let createTodoDto = JSON.parse(data);
  //   createTodoDto.filename = file.filename;
  //   console.log('File uploaded:', file);
  //   console.log('Data:', createTodoDto);
  //   return this.todosService.create(createTodoDto);
  // }

  //   {
  //   const parsed = JSON.parse(jsonData);
  //   console.log(file.originalname, parsed);
  //   return { message: 'Success' };
  // }
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all todos',
    type: [Todo],
  })
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found todo',
    type: Todo,
  })

  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }


  @Get('/meeting/:meetingId')
  @ApiResponse({
    status: 200,
    description: 'The found todos',
    type: [Todo],
  })
  findByMeeting(@Param('meetingId', ParseIntPipe) meetingId: number): Promise<Todo[]> {
    return this.todosService.findByMeeting(meetingId);
  }

  @Get('/case/:caseId')
  @ApiResponse({
    status: 200,
    description: 'The found todos',
    type: [Todo],
  })
  findByCase(@Param('caseId', ParseIntPipe) caseId: number): Promise<Todo[]> {
    return this.todosService.findByCase(caseId);
  }


  // @Get('file/:id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found todo',
  //   schema: {
  //     type: 'string',
  //     format: 'binary',
  //   },
  // })
  // async getFile(@Param('id', ParseIntPipe) id: number, @Res() res): Promise<void> {
  //   const todo = await this.todosService.findOne(id);
  //   const filePath = path.join(__dirname, '..', '..', '..', 'uploads', todo.filename);
  //   const fileStream = fs.createReadStream(filePath);

  //   fileStream.on('error', (err) => {
  //     res.status(404).send({ message: 'File not found' });
  //   });

  //   res.set({
  //     'Content-Type': 'application/octet-stream',
  //     'Content-Disposition': `attachment; filename="${todo.filename}"`,
  //   });

  //   fileStream.pipe(res);
  // }
  //   @Delete(':id')
  //   remove(@Param('id') id: string): Promise<void> {
  //     return this.todoService.remove(id);
  //   }
}
