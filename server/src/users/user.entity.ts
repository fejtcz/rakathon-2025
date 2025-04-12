import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from 'src/lists/specialization/specialization.entity';
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
  
  @Column({nullable: true})
  @ApiProperty({ example: 'test@test.cz', description: 'E-mail' })
  email: string;

  @Column({nullable: true})
  @ApiProperty({ example: 'gravatar', description: 'Photo URL' })
  photoUrl: string;

  @ManyToMany(() => Specialization)
  @JoinTable()
  @ApiProperty({ type: () => Specialization, isArray: true, description: 'List of specializations' })
  specializations: Specialization[];

  @Column({default: true})
  @ApiProperty({ example: true, description: 'Aktivovan ' })
  isActive: boolean;
}

