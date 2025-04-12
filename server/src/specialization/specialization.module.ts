import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization } from './specialization.entity';
import { SpecializationController } from './specialization.controller';
import { SpecializationService } from './specialization.service';
@Module({
  imports: [TypeOrmModule.forFeature([Specialization])],
  providers: [SpecializationService],
  controllers: [SpecializationController],
})
export class SpecializationModule {}
