import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Procedures {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 128 })
    name: string;
}
