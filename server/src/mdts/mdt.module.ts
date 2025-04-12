import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mdt } from './mdt.entity';
import { MdtController } from './mdt.controller';
import { MdtService } from './mdt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mdt])],
  providers: [MdtService],
  controllers: [MdtController],
})
export class MdtModule {}
