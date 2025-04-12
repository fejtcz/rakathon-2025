import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) { }

  create(createRecordDto: CreateRecordDto): Promise<Record> {
    const record = new Record();
    record.uploadedById = createRecordDto.uploadedById;
    record.meetingId = createRecordDto.meetingId;
    record.timestamp = createRecordDto.timestamp;
    record.filename = createRecordDto.filename;
    record.transcription = createRecordDto.transcription;
    record.caseId = createRecordDto.caseId;
    //record.name  = createRecordDto.name;
    //record.leaderId = createRecordDto.leaderId;
    //record.leader = createRecordDto.leader;
    //record.members = createRecordDto.members;

    return this.recordRepository.save(record);
  }

  async findAll(): Promise<Record[]> {
    return this.recordRepository.find({ relations: { meeting: true } });
  }

  async findByMeeting(meetingId: number): Promise<Record[]> {
    return this.recordRepository.find({ where: { meetingId }, relations: { meeting: true } });
  }
  async findByCase(caseId: number): Promise<Record[]> {
    return this.recordRepository.find({ where: { caseId }, relations: { meeting: true } });
  }
  findOne(id: number): Promise<Record> {
    return this.recordRepository.findOne({
      where: { id }, 
      relations: { meeting: true } });
  }

//   async remove(id: string): Promise<void> {
//     await this.recordRepository.delete(id);
//   }
}
