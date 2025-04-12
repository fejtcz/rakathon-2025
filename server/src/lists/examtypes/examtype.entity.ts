import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class ExamType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  @ApiProperty({ example: 'RTG', description: 'Typ vyšetření' })
  description: string;
}
