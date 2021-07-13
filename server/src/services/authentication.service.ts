import * as crypto from 'crypto';
import { RedisClient } from '@infrastructure/redis/redis.interfaces';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AuthenticationException } from '@servicesexceptions';
import {
    IAuthenticationSession,
    ILogin,
    IOauth,
    ISessionInfo,
} from '@servicesinterfaces/authentication.interface';
import { IUserProfile } from '@servicesinterfaces/userprofile.interface';
import { ApplicationConfig } from '@srcapplication.config';
import { v4 as uuid } from 'uuid';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject('Redis') private readonly redisClient: RedisClient,
        private readonly httpService: HttpService
    ) {}

    public getSessionInfo(iLogin: ILogin): Observable<ISessionInfo> {
        return forkJoin({
            userInformation: this.findUserInformation(iLogin.username),
            oAuthToken: this.getOAuth2Token(iLogin),
        }).pipe(
            map((results) => {
                const currentDate = Date.now();
                const expirationDate =
                    currentDate + 1000 * results.oAuthToken.expires_in;
                return {
                    token: `${results.oAuthToken.token_type} ${results.oAuthToken.access_token}`,
                    scopes: results.oAuthToken.scope,
                    userId: results.userInformation.user_id,
                    created_at: currentDate,
                    expiration_at: expirationDate,
                } as IAuthenticationSession;
            }),
            map((authenticationSession) => {
                return this.saveSessionOnRedis(authenticationSession);
            }),
            catchError((error) => {
                return throwError(
                    new AuthenticationException(JSON.stringify(error.response))
                );
            })
        );
    }

    private getCacheKey(userId: string): string {
        return crypto
            .createHash('sha256')
            .update(`${uuid()}:${userId}`)
            .digest('hex');
    }

    private saveSessionOnRedis(authenticationSession: IAuthenticationSession) {
        const key = this.getCacheKey(authenticationSession.userId);
        this.redisClient.set(
            key,
            JSON.stringify(authenticationSession),
            'PX',
            authenticationSession.expiration_at
        );
        return {
            key,
            maxAge: authenticationSession.expiration_at,
        } as ISessionInfo;
    }

    private findUserInformation(email: string): Observable<IUserProfile> {
        return this.httpService
            .post(`${ApplicationConfig.USER_MS_URL}/v1/userprofile`, {
                email,
            })
            .pipe(this.mapResponseToObject());
    }

    private getOAuth2Token(iLogin: ILogin): Observable<IOauth> {
        return this.httpService
            .post(`${ApplicationConfig.LOGIN_MS_URL}/v1/oauth2/token`, iLogin)
            .pipe(this.mapResponseToObject());
    }

    private mapResponseToObject() {
        return map((response: any) => {
            return response.data;
        });
    }
}
