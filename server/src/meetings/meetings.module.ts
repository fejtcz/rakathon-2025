import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingsService],
  controllers: [MeetingsController],
})
export class MeetingsModule {}
