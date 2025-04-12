import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Case } from "../cases/case.entity";
import { Mdt } from "../mdts/mdt.entity";
import { Meeting } from "../meetings/meeting.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true }) // ukoly nemusi vzniknout jen na meetingu
  @ApiProperty({ example: 1, description: 'The id of the meeting' })
  meetingId: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ example: 1, description: 'The id of the case' })
  caseId: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ example: 1, description: 'The id of the user who created the todo' })
  createdById: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'createdById', referencedColumnName: 'id' })
  createdBy: User;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ example: 1, description: 'The id of the user for whom created the todo' })
  createdForId: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'createdForId', referencedColumnName: 'id' })
  createdFor: User;

  @Column({ type: 'timestamptz', nullable: false })
  created: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date;

  @Column()
  note: string;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ example: 1, description: 'Statusy - kdyby bylo potřeba řešit více stavů' })
  status: number;

}


