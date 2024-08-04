import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        req.user = user;
        return user;
    }
}
