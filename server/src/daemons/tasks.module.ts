// tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Meeting } from '../meetings/meeting.entity';
import { User } from '../users/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Meeting, User])],
  providers: [TasksService],
})
export class TasksModule {}
