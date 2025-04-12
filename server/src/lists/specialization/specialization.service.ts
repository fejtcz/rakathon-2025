import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './dto/create-user.dto';
//import { User } from '../users/user.entity';
import { Specialization } from './specialization.entity';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {}

 
  async findAll(): Promise<Specialization[]> {
    return this.specializationRepository.find();
  }

  findOne(code: string): Promise<Specialization> {
    return this.specializationRepository.findOneBy({ code });
  }


}
