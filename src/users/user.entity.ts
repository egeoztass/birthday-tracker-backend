import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Birthday } from '../birthdays/birthday.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('text', { array: true })
    roles: string[];

    @Column('text', { array: true })
    permissions: string[];

    @OneToMany(() => Birthday, (birthday) => birthday.user)
    birthdays: Birthday[];
}
