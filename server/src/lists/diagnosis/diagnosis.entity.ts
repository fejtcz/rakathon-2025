import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Diagnosis {
  @PrimaryColumn({type: 'varchar', length: 10  })
  @ApiProperty({ example: 'X02', description: 'Kód diagnózy' })
  code: string;

  @Column({type: 'varchar', length: 128  })
  @ApiProperty({ example: 'Vystavení kontrolovanému ohni v budovách a konstrukcích', description: 'Popis diagnózy' })
  description: string;
}
