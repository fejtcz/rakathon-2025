import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { configService } from '../config/config.service';
import { SpecializationModule } from './lists/specialization/specialization.module';
import { DiagnosisModule } from './lists/diagnosis/diagnosis.module';
import { ProceduresModule } from './lists/procedures/procedures.module';
import { MdtModule } from './mdts/mdt.module';
import { CasesModule } from './cases/cases.module';
import { MeetingsModule } from './meetings/meetings.module';
import { RecordsModule } from './records/records.module';
import { MulterModule } from '@nestjs/platform-express';
import { ClinicsModule } from './lists/clinics/clinics.module';
import { ExamTypesModule } from './lists/examtypes/examtypes.module';
import { ExaminationsModule } from './examinations/examinations.module';
import { LiveCallModule } from './livecall/livecall.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    SpecializationModule,
    DiagnosisModule,
    ProceduresModule,
    MdtModule,
    AuthModule,    
    CasesModule,
    MeetingsModule,
    RecordsModule,
    ClinicsModule,
    ExamTypesModule,
    ExaminationsModule,
    LiveCallModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    })
  ]
})
export class AppModule { }
