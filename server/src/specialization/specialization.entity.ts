import { Column, ManyToMany, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
//import { User } from '../users/user.entity';
@Entity()
export class Specialization {
  @PrimaryColumn()
  code: string;

  @Column()
  desc: string;

//  @ManyToMany(() => User, user => user.specializations)
//  users: User[];
}
