import { Column, ManyToMany, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
//import { User } from '../users/user.entity';
@Entity()
export class Specialization {
  @PrimaryColumn()
  @ApiProperty({ example: 'gyn', description: 'Kód odbornosti' })
  code: string;

  @Column()
  @ApiProperty({ example: 'Gynekologie', description: 'Popis specializace' })
  desc: string;
//  @ManyToMany(() => User, user => user.specializations)
//  users: User[];
}
