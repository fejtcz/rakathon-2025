import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './procedures.entity';
import { ProceduresController } from './procedures.controller';
import { ProceduresService } from './procedures.service';
@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProceduresService],
  controllers: [ProceduresController],
})
export class ProceduresModule {}
