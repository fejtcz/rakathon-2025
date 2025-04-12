import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Case } from "../cases/case.entity";
import { Mdt } from "../mdts/mdt.entity";
import { Meeting } from "../meetings/meeting.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'The id of the record' })
    id: number;

    @Column({ type: 'timestamptz', nullable: false })
    @ApiProperty({ example: '2021-01-01T12:00:00.000Z', description: 'The timestamp of the record' })
    timestamp: Date;

    @Column({ type: 'int', nullable: false })
    @ApiProperty({ example: 1, description: 'The id of the meeting of the record' })
    meetingId: number;

    @Column({ type: 'int', nullable: true })
    @ApiProperty({ example: 1, description: 'The id of the case of the record' })
    caseId: number;

    @ManyToOne(() => Meeting, meeting => meeting.id)
    @JoinColumn({ name: 'meetingId', referencedColumnName: 'id' })
    meeting: Meeting;

    @Column({ type: 'int', nullable: false })
    @ApiProperty({ example: 1, description: 'The id of the user who uploaded the record' })
    uploadedById: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'uploadedById', referencedColumnName: 'id' })
    uploadedBy: User;

    @Column({ type: 'json' })
    @ApiProperty({ example: {}, description: 'The transcription of the record' })
    transcription: object;

    @Column({ type: 'varchar', nullable: true })
    @ApiProperty({ example: 'record.mp3', description: 'The filename of the record' })
    filename: string;
}

