import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from './meeting.entity';
import { MeetingsService } from './meetings.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('meetings')

export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  create(@Body() createMeetingsDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingsService.create(createMeetingsDto);
  }

  @Get()
  findAll(): Promise<Meeting[]> {
    return this.meetingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Meeting,
  })

  findOne(@Param('id', ParseIntPipe) id: number): Promise<Meeting> {
    return this.meetingsService.findOne(id);
  }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.meetingsService.remove(id);
//   }
}
