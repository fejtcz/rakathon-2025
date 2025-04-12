import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) { }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.caseId = createTodoDto.caseId;
    todo.createdById = createTodoDto.createdById;
    todo.createdForId = createTodoDto.createdForId;
    todo.deadline = createTodoDto.deadline;
    todo.created = createTodoDto.created;
    todo.note = createTodoDto.note;
    todo.status = 0;//createTodoDto.status;
    todo.meetingId = createTodoDto.meetingId;
    // todo.uploadedById = createTodoDto.uploadedById;
    // todo.meetingId = createTodoDto.meetingId;
    // todo.timestamp = createTodoDto.timestamp;
    // todo.filename = createTodoDto.filename;
    // todo.transcription = createTodoDto.transcription;
    // todo.caseId = createTodoDto.caseId;
    // //todo.name  = createTodoDto.name;
    //todo.leaderId = createTodoDto.leaderId;
    //todo.leader = createTodoDto.leader;
    //todo.members = createTodoDto.members;

    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ relations: { createdBy: true, createdFor: true } });
  }

  async findByMeeting(meetingId: number): Promise<Todo[]> {
    return this.todoRepository.find({ where: { meetingId }, relations: { createdBy: true, createdFor: true} });
  }
  async findByCase(caseId: number): Promise<Todo[]> {
    return this.todoRepository.find({ where: { caseId }, relations: { createdBy: true, createdFor: true } });
  }
  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: { id }, 
      relations: { createdBy: true, createdFor: true } });
  }

//   async remove(id: string): Promise<void> {
//     await this.todoRepository.delete(id);
//   }
}
