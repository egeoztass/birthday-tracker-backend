import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('roles') roles: string[],
        @Body('permissions') permissions: string[],
    ) {
        return this.authService.register(email, password, roles, permissions);
    }
}
