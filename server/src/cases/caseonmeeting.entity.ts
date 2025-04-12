import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Mdt } from "../mdts/mdt.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CaseOnMeeting {
    @PrimaryColumn()
    meetingId: number;

    @PrimaryColumn()
    caseId: number;

    @Column()
    note: string;

    @Column()
    order: number;
}
