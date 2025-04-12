import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './dto/create-user.dto';
//import { User } from '../users/user.entity';
import { Diagnosis } from './diagnosis.entity';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly diagnosisRepository: Repository<Diagnosis>,
  ) {}

 
  async findAll(): Promise<Diagnosis[]> {
    return this.diagnosisRepository.find();
  }

  findOne(code: string): Promise<Diagnosis> {
    return this.diagnosisRepository.findOneBy({ code });
  }


}
