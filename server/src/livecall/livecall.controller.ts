import { Controller, Get, Query } from '@nestjs/common';
import { LiveCallService } from './livecall.service';

@Controller('livecall')
export class LiveCallController {
  constructor(private readonly livecallService: LiveCallService) {}

  @Get('token')
  async getToken(
    @Query('room') room: string,
    @Query('userId') userId: string,
    @Query('userName') userName: string
  ) {
    const token = await this.livecallService.generateToken(room, userId, userName);
    return { token };
  }
}
