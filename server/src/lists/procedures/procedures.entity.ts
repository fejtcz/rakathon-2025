import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Procedure {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Id' })
    id: number;

    @Column('varchar', { length: 128 })
    @ApiProperty({ example: 'Procedure Name', description: 'The name of the procedure' })
    name: string;
}
