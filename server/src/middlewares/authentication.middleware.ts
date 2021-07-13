import { RedisClient } from '@infrastructure/redis/redis.interfaces';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ApplicationConfig } from '@src/application.config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(@Inject('Redis') private readonly redisClient: RedisClient) {}

    public async use(request: Request, response: Response, next: NextFunction) {
        const sessionCookie =
            request.cookies[ApplicationConfig.SESSION_COOKIE_NAME];
        if (sessionCookie) {
            const sessionInfo = await this.redisClient.get(sessionCookie);
            if (sessionInfo) {
                response.redirect(ApplicationConfig.ORCHESTRATOR_URL);
            }
        }
        next();
    }
}
