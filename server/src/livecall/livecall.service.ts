import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class LiveCallService {
  private apiKey = process.env.LIVEKIT_API_KEY;
  private apiSecret = process.env.LIVEKIT_API_SECRET;

  generateToken(room: string, userId: string, userName: string): Promise<string> {
    const at = new AccessToken(this.apiKey, this.apiSecret, {
      identity: userId,
      //name: userName,
    });

    at.addGrant({ roomJoin: true, room });
    console.log(at);
    return at.toJwt();
  }
}
