import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Case } from "../cases/case.entity";
import { Mdt } from "../mdts/mdt.entity";
import { Meeting } from "../meetings/meeting.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz', nullable: false })
    timestamp: Date;

    @Column({ type: 'int', nullable: false })
    meetingId: number;

    @ManyToOne(() => Meeting, meeting => meeting.id)
    @JoinColumn({ name: 'meetingId', referencedColumnName: 'id' })
    meeting: Meeting;

    @Column({ type: 'int', nullable: false })
    uploadedById: number;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'meetingId', referencedColumnName: 'id' })
    uploadedBy: User;

    @Column({ type: 'json' })
    @ApiProperty({ example: {}, description: 'Transcription' })
    transcription: object;
}
