import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Diagnosis {
  @PrimaryColumn()
  code: string;

  @Column()
  description: string;
}
