import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Birthday } from './birthday.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BirthdaysService {
    constructor(
        @InjectRepository(Birthday)
        private readonly birthdayRepository: Repository<Birthday>,
    ) {}

    async create(user: User, name: string, date: string): Promise<Birthday> {
        const birthday = this.birthdayRepository.create({ name, date, user });
        return this.birthdayRepository.save(birthday);
    }

    async findAll(user: User): Promise<Birthday[]> {
        return this.birthdayRepository.find({ where: { user: { id: user.id } } });
    }

    async update(id: number, name: string, date: string): Promise<Birthday> {
        const birthday = await this.birthdayRepository.findOne({ where: { id } });
        if (!birthday) {
            throw new NotFoundException('Birthday not found');
        }
        birthday.name = name;
        birthday.date = date;
        return this.birthdayRepository.save(birthday);
    }

    async delete(id: number): Promise<void> {
        const birthday = await this.birthdayRepository.findOne({ where: { id } });
        if (!birthday) {
            throw new NotFoundException('Birthday not found');
        }
        await this.birthdayRepository.remove(birthday);
    }
}
