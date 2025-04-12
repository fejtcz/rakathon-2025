import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamType } from './examtype.entity';
import { ExamTypesController } from './examtypes.controller';
import { ExamTypesService } from './examtypes.service';
@Module({
  imports: [TypeOrmModule.forFeature([ExamType])],
  providers: [ExamTypesService],
  controllers: [ExamTypesController],
})
export class ExamTypesModule {}
