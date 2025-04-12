import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Mdt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    //@ApiProperty({ example: 'Jan', description: 'Jméno' })
    name: string;
    @Column()
    surname: string;

    @Column({ type: 'int', nullable: false })
    leaderId: number;


    @ManyToOne(() => User, user => user.id, { nullable: false })
    @JoinColumn({ name: 'leaderId', referencedColumnName: 'id' })
    leaderx: User;


    @JoinTable({
        name: 'leaderId',
        joinColumn: { name: 'id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'leaderId', referencedColumnName: 'id' }
    })
    @ManyToOne(() => User, user => user.id, { nullable: false })
    leader: User;


    @ManyToMany(() => User)
    @JoinTable()
    members: User[];
}
