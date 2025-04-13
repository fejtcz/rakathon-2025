import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from '../meetings/meeting.entity';
import { LessThan } from "typeorm"
import { Between } from "typeorm"
import { User } from '../users/user.entity';

@Injectable()
export class TasksService implements OnModuleInit {
    constructor(
        @InjectRepository(Meeting)
        private readonly meetingsRepo: Repository<Meeting>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    onModuleInit() {
        // CRON výraz: každých 5 minut
        cron.schedule('*/60 * * * * *', async () => {
            console.log('🕔 Spouštím úlohu každých 5 minut');
            await this.processData();
        });
    }

    async processData() {
        const records = await this.meetingsRepo.find({
            where: { plannedDate: Between(new Date(), new Date(Date.now() + 1000 * 60 * 60 * 24)) },
            relations: { cases: true, mdt: true, responsible: true, notified: true, willAttend: true, guests: true, attended: true }
        });
        //console.log(`📦 Nalezeno ${records.length} záznamů.`, records);
        for (const meeting of records) {
            const user = await this.userRepo.findOneBy({ id: 1 });
            if (!user) {
              throw new Error(`User ID 1 nebyl nalezen.`);
            }
            meeting.notified.push(user);
            await this.meetingsRepo.save(meeting);
        }
        // Tady přidej svoji logiku – zpracování, filtrování, update...
    }
}