import { RedisClient } from '@infrastructureredis/redis.interfaces';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ApplicationConfig } from '@srcapplication.config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(@Inject('Redis') private readonly redisClient: RedisClient) {}

    public async use(request: Request, response: Response, next: NextFunction) {
        const sessionCookie =
            request.cookies[ApplicationConfig.SESSION_COOKIE_NAME];
        console.log('aqui', sessionCookie);
        if (sessionCookie) {
            const sessionInfo = await this.redisClient.get(sessionCookie);
            if (sessionInfo) {
                return response.redirect(ApplicationConfig.ORCHESTRATOR_URL);
            }
        }
        next();
    }
}
