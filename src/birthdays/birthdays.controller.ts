import { Controller, Post, Body, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import {CreateBirthdayDto} from "./dto/create-birthday.dto";
import { UpdateBirthdayDto } from './dto/update-birthday.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('birthdays')
@UseGuards(JwtAuthGuard)
export class BirthdaysController {
    constructor(private readonly birthdaysService: BirthdaysService) {}

    @Post()
    async create(@Request() req, @Body() createBirthdayDto: CreateBirthdayDto) {
        const user = req.user;
        return this.birthdaysService.create(user, createBirthdayDto.name, createBirthdayDto.date);
    }

    @Get()
    async findAll(@Request() req) {
        const user = req.user;
        return this.birthdaysService.findAll(user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateBirthdayDto: UpdateBirthdayDto) {
        return this.birthdaysService.update(id, updateBirthdayDto.name, updateBirthdayDto.date);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.birthdaysService.delete(id);
    }
}
