import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
console.log('heeej', __dirname)
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { configService } from '../config/config.service';
import { SpecializationModule } from './specialization/specialization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    SpecializationModule,
    AuthModule,

  ]
})
export class AppModule { }
