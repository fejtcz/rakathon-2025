import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMdtDto } from './dto/create-mdt.dto';
import { Mdt } from './mdt.entity';

@Injectable()
export class MdtService {
  constructor(
    @InjectRepository(Mdt)
    private readonly mdtRepository: Repository<Mdt>,
  ) { }

  create(createMdtDto: CreateMdtDto): Promise<Mdt> {
    const mdt = new Mdt();
    mdt.name  = createMdtDto.name;
    mdt.leaderId = createMdtDto.leaderId;
    //mdt.leader = createMdtDto.leader;
    //mdt.members = createMdtDto.members;

    return this.mdtRepository.save(mdt);
  }

  async findAll(): Promise<Mdt[]> {
    return this.mdtRepository.find({ relations: { members: true, leader: true } });
  }

  findOne(id: number): Promise<Mdt> {
    return this.mdtRepository.findOne({
      where: { id }, 
      relations: { members: true, leader: true } });
  }

//   async remove(id: string): Promise<void> {
//     await this.mdtRepository.delete(id);
//   }
}
