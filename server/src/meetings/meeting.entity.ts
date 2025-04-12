import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Case } from "../cases/case.entity";
import { Mdt } from "../mdts/mdt.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    responsibleId: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'responsibleId', referencedColumnName: 'id' })
    responsible: User;

    @Column({ type: 'int', nullable: true })
    mdtId: number;

    @ManyToOne(() => Mdt, mdt => mdt.id)
    @JoinColumn({ name: 'mdtId', referencedColumnName: 'id' })
    mdt: Mdt;

    @Column({ type: 'timestamptz', nullable: false })
    plannedDate: Date;

    @ManyToMany(() => Case)
    @JoinTable()
    cases: Case[];
    // @ManyToMany(() => Case, mdt => mdt.id)
    // @JoinColumn({ name: 'caseId', referencedColumnName: 'id' })
    // casesList: Case[];
}
