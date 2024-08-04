import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const fullUser = await this.usersService.findById(user.id);
        const payload = { email: fullUser.email, sub: fullUser.id, roles: fullUser.roles, permissions: fullUser.permissions };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


    async register(email: string, password: string, roles: string[], permissions: string[]): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.createUser(email, hashedPassword, roles, permissions);
    }
}
