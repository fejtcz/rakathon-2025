import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from 'src/specialization/specialization.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'Lubomír', description: 'Jméno' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Sedláček', description: 'Příjmení' })
  lastName: string;
  
  @ManyToMany(() => Specialization)
  @JoinTable()
  specializations: Specialization[];

  @Column({default: true})
  isActive: boolean;
}

