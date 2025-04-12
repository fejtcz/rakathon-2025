import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from './examination.entity';
import { ExaminationsController } from './examinations.controller';
import { ExaminationsService } from './examinations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Examination])],
  providers: [ExaminationsService],
  controllers: [ExaminationsController],
})
export class ExaminationsModule {}
