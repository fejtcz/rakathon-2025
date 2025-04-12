import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Case } from "../cases/case.entity";
import { User } from "../users/user.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Examination {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The id of the examination' })
    id: number;

    @Column({ type: 'int', nullable: false })
    @ApiProperty({ example: 1, description: 'The id of the patient' })
    caseId: number;

    @ManyToOne(() => Case, casex => casex.id)
    @JoinColumn({ name: 'caseId', referencedColumnName: 'id' })
    case: Case;


    @Column({ type: 'timestamptz', nullable: true })
    @ApiProperty({ example: '2021-01-01T12:00:00.000Z', description: 'Plánováno na' })
    sheduledAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    @ApiProperty({ example: '2021-01-01T12:00:00.000Z', description: 'Dokončeno' })
    completedAt: Date

    @Column({ type: 'int', nullable: false })
    @ApiProperty({ example: 1, description: 'The id of the user who uploaded the record' })
    uploadedById: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'uploadedById', referencedColumnName: 'id' })
    uploadedBy: User;

    @Column({ type: 'json' })
    @ApiProperty({ example: {}, description: 'The transcription of the examination' })
    transcription: object;

    @Column({ type: 'varchar', nullable: true })
    @ApiProperty({ example: 'exam.pdf', description: 'The filename of the result' })
    result: string;
}

