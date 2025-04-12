import { Module } from '@nestjs/common';
import { LiveCallController } from './livecall.controller';
import { LiveCallService } from './livecall.service';

@Module({
  controllers: [LiveCallController],
  providers: [LiveCallService],
})
export class LiveCallModule {}
