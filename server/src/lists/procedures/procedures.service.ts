import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './dto/create-user.dto';
//import { User } from '../users/user.entity';
import { Procedure } from './procedures.entity';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private readonly proceduresRepository: Repository<Procedure>,
  ) {}

 
  async findAll(): Promise<Procedure[]> {
    return this.proceduresRepository.find();
  }

  findOne(id: number): Promise<Procedure> {
    return this.proceduresRepository.findOneBy({ id });
  }


}
