import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from './meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingsRepository: Repository<Meeting>,
  ) { }

  create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting = new Meeting();
    meeting.responsibleId = createMeetingDto.responsibleId;
    meeting.plannedDate = createMeetingDto.plannedDate;
    meeting.mdtId = createMeetingDto.mdt;
    meeting.cases = createMeetingDto.cases;
    //meetings.leader = createMeetingsDto.leader;
    //meetings.members = createMeetingsDto.members;

    return this.meetingsRepository.save(meeting);
  }

  async findAll(): Promise<Meeting[]> {
    return this.meetingsRepository.find({ relations: {cases: true, mdt: true, responsible: true } });
  }

  findOne(id: number): Promise<Meeting> {
    return this.meetingsRepository.findOne({
      where: { id }, 
      relations: { cases: true, responsible: true, mdt: true } });
  }

//   async remove(id: string): Promise<void> {
//     await this.meetingsRepository.delete(id);
//   }
}
