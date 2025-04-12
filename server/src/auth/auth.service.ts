import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    
    constructor(
        private jwtService: JwtService,
      ) {}
    
    async signIn(username: string, pass: string): Promise<any> {

        const payload = { username: 'test', id: 1 };
        return {
            access_token: await this.jwtService.signAsync(payload),
            username: payload.username,
            id: payload.id,
        };
    }
}
