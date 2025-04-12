import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { Examination } from './examination.entity';

@Injectable()
export class ExaminationsService {
  constructor(
    @InjectRepository(Examination)
    private readonly recordRepository: Repository<Examination>,
  ) { }

  create(createExaminationDto: CreateExaminationDto): Promise<Examination> {
    const record = new Examination();
    record.uploadedById = createExaminationDto.uploadedById;
    // record.meetingId = createExaminationDto.meetingId;
    // record.timestamp = createExaminationDto.timestamp;
    record.result = createExaminationDto.result;
    record.transcription = createExaminationDto.transcription;
    record.caseId = createExaminationDto.caseId;
    //record.name  = createExaminationDto.name;
    //record.leaderId = createExaminationDto.leaderId;
    //record.leader = createExaminationDto.leader;
    //record.members = createExaminationDto.members;

    return this.recordRepository.save(record);
  }

  async findAll(): Promise<Examination[]> {
    return this.recordRepository.find({ relations: { case: true } });
  }

 
  async findByCase(caseId: number): Promise<Examination[]> {
    return this.recordRepository.find({ where: { caseId }, relations: {  } });
  }
  findOne(id: number): Promise<Examination> {
    return this.recordRepository.findOne({
      where: { id }, 
      relations: { } });
  }

//   async remove(id: string): Promise<void> {
//     await this.recordRepository.delete(id);
//   }
}
