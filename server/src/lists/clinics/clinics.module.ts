import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './clinic.entity';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicsService],
  controllers: [ClinicsController],
})
export class ClinicsModule {}
