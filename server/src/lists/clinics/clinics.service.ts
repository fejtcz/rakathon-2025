import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './dto/create-user.dto';
//import { User } from '../users/user.entity';
import { Clinic } from './clinic.entity';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicsRepository: Repository<Clinic>,
  ) {}

 
  async findAll(): Promise<Clinic[]> {
    return this.clinicsRepository.find();
  }

  findOne(id: number): Promise<Clinic> {
    return this.clinicsRepository.findOneBy({ id });
  }


}
