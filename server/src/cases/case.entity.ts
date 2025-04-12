import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Mdt } from "../mdts/mdt.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Case {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 128, nullable: false })
    @ApiProperty({ example: 'Jan', description: 'Jméno' })
    name: string;
    @Column({ type: 'varchar', length: 128, nullable: false })
    @ApiProperty({ example: 'Novák', description: 'Příjmení' })
    surname: string;

    @Column({ type: 'varchar', length: 128, nullable: true  })
    prefix: string;
    
    @Column({ type: 'varchar', length: 128, nullable: true })
    suffix: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    regNumber: string;

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

}
