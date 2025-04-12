import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCaseDto } from './dto/create-case.dto';
import { Case } from './case.entity';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private readonly casesRepository: Repository<Case>,
  ) { }

  create(createCaseDto: CreateCaseDto): Promise<Case> {
    const casex = new Case();
    casex.name  = createCaseDto.name;
    casex.surname  = createCaseDto.surname;
    casex.responsibleId = createCaseDto.responsibleId;
    casex.mdtId = createCaseDto.mdtId;
    casex.regNumber = createCaseDto.regNumber;
    //case.leader = createCaseDto.leader;
    //case.members = createCaseDto.members;

    return this.casesRepository.save(casex);
  }

  async findAll(): Promise<Case[]> {
    return this.casesRepository.find({ relations: { responsible: true, mdt: true } });
  }

  findOne(id: number): Promise<Case> {
    return this.casesRepository.findOne({
      where: { id }, 
      relations: { responsible: true, mdt: true } });
  }

//   async remove(id: string): Promise<void> {
//     await this.caseRepository.delete(id);
//   }
}
