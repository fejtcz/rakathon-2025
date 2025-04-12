import { Column, ManyToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { User } from '../users/user.entity';
@Entity()
export class Specialization {
  @PrimaryGeneratedColumn()
  code: string;

  @Column()
  desc: string;

//  @ManyToMany(() => User, user => user.specializations)
//  users: User[];
}
