import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Birthday } from './birthday.entity';
import { BirthdaysService } from './birthdays.service';
import { BirthdaysController } from './birthdays.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Birthday])],
    providers: [BirthdaysService],
    controllers: [BirthdaysController],
})
export class BirthdaysModule {}
