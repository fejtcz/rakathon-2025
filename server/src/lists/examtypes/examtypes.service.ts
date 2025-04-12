import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateUserDto } from './dto/create-user.dto';
//import { User } from '../users/user.entity';
import { ExamType } from './examtype.entity';

@Injectable()
export class ExamTypesService {
  constructor(
    @InjectRepository(ExamType)
    private readonly examTypesRepository: Repository<ExamType>,
  ) {}

 
  async findAll(): Promise<ExamType[]> {
    return this.examTypesRepository.find();
  }

  findOne(id: number): Promise<ExamType> {
    return this.examTypesRepository.findOneBy({ id });
  }


}
