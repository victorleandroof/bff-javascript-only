import { createMock, DeepMocked } from '@golevelup/nestjs-testing';
import { RedisClient } from '@infrastructure/redis/redis.interfaces';
import { HttpService } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { AxiosError } from 'axios';
import {
    IAuthenticationSession,
    ILogin,
    ISessionInfo,
} from './interfaces/authentication.interface';
import { AuthenticationException } from './exceptions';

jest.mock('@src/application.config', () => ({
    ApplicationConfig: {
        LOGIN_MS_URL: 'http://login',
        USER_MS_URL: 'http://user',
    },
}));
jest.mock('uuid', () => ({ v4: () => '12345' }));

describe('AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    let redisClientMock: DeepMocked<RedisClient>;
    let httpServiceMock: DeepMocked<HttpService>;
    const keyMock =
        'd0ba93f7e3ba9fa0050b77f38ac72376e20f9bb147f9908b410e1e4915bf74f1';
    const baseTime = 1626304293407;
    const loginRequest: ILogin = {
        password: '123@123',
        username: 'mock',
    };
    const mockLoginResponse = {
        access_token: 'string',
        token_type: 'string',
        expires_in: 3600,
        refresh_token: 'string',
        scope: ['userprofile'],
    };
    const mockUserResponse = {
        user_id: 'string',
        firstname: 'string',
        lastname: 'string',
        email: 'string',
    };
    const autenticationSession: IAuthenticationSession = {
        token: `${mockLoginResponse.token_type} ${mockLoginResponse.access_token}`,
        scopes: mockLoginResponse.scope,
        userId: mockUserResponse.user_id,
        created_at: baseTime,
        expiration_at: baseTime + 1000 * mockLoginResponse.expires_in,
    };
    const sessionInfoResult: ISessionInfo = {
        key: keyMock,
        maxAge: autenticationSession.expiration_at,
    };
    const createAxiosResponse = (data) => ({
        config: {},
        data: data,
        headers: {},
        status: 200,
        statusText: 'OK',
    });
    beforeEach(() => {
        jest.spyOn(global.Date, 'now').mockImplementation(() => baseTime);
        redisClientMock = createMock<RedisClient>();
        httpServiceMock = createMock<HttpService>();
        authenticationService = new AuthenticationService(
            redisClientMock,
            httpServiceMock
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw AuthenticationException when the user profile service returns error', () => {
        // GIVEM
        const timeOutError = {
            config: {},
            name: '',
            message: '',
            response: {
                headers: {},
                config: {},
                data: {
                    error: {
                        statusCode: 504,
                        message: 'Request timeout exceeded. Try it later',
                    },
                },
                status: 504,
                statusText: 'TIMEOUT',
            },
        } as AxiosError;

        httpServiceMock.post.mockImplementationOnce(() =>
            throwError(timeOutError)
        );
        // ACTION
        authenticationService.getSessionInfo(loginRequest).subscribe(
            () => fail(),
            (error) => {
                // ASSERT
                expect(error).toBeInstanceOf(AuthenticationException);
                expect(httpServiceMock.post).toHaveBeenCalledWith(
                    'http://user/v1/userprofile',
                    {
                        username: loginRequest.username,
                    }
                );
            }
        );
    });

    it('should throw AuthenticationException when the oauth2 service returns error', () => {
        // GIVEM
        const timeOutError = {
            config: {},
            name: '',
            message: '',
            response: {
                headers: {},
                config: {},
                data: {
                    error: {
                        statusCode: 504,
                        message: 'Request timeout exceeded. Try it later',
                    },
                },
                status: 504,
                statusText: 'TIMEOUT',
            },
        } as AxiosError;

        httpServiceMock.post
            // USER PROFILE
            .mockImplementationOnce(() => of(createAxiosResponse({})))
            // OAUTH2 SERVICE
            .mockImplementationOnce(() => throwError(timeOutError));
        // ACTION
        authenticationService.getSessionInfo(loginRequest).subscribe(
            () => fail(),
            (error) => {
                // ASSERT
                expect(error).toBeInstanceOf(AuthenticationException);
                expect(httpServiceMock.post).toHaveBeenCalledWith(
                    'http://user/v1/userprofile',
                    {
                        username: loginRequest.username,
                    }
                );
                expect(httpServiceMock.post.mock.calls).toEqual([
                    [
                        'http://user/v1/userprofile',
                        {
                            username: loginRequest.username,
                        },
                    ],
                    ['http://login/v1/oauth2/token', loginRequest],
                ]);
            }
        );
    });

    it('should throw AuthenticationException when redis returns a error on saving session', () => {
        // GIVEM
        const redisErrorMock = new Error('failed');
        redisClientMock.set.mockImplementationOnce(() => {
            throw redisErrorMock;
        });
        httpServiceMock.post
            // USER PROFILE
            .mockImplementationOnce(() =>
                of(createAxiosResponse(mockUserResponse))
            )
            // OAUTH2 SERVICE
            .mockImplementationOnce(() =>
                of(createAxiosResponse(mockLoginResponse))
            );
        // ACTION
        authenticationService.getSessionInfo(loginRequest).subscribe(
            () => fail(),
            (error) => {
                // ASSERT
                expect(error).toBeInstanceOf(AuthenticationException);
                expect(redisClientMock.set).toBeCalledWith(
                    keyMock,
                    JSON.stringify(autenticationSession),
                    'PX',
                    autenticationSession.expiration_at
                );
            }
        );
    });

    it('should return session info when saved token and user info in redis', () => {
        // GIVEM
        httpServiceMock.post
            // USER PROFILE
            .mockImplementationOnce(() =>
                of(createAxiosResponse(mockUserResponse))
            )
            // OAUTH2 SERVICE
            .mockImplementationOnce(() =>
                of(createAxiosResponse(mockLoginResponse))
            );
        // ACTION
        authenticationService.getSessionInfo(loginRequest).subscribe(
            (sessionInfo) => {
                // ASSERT
                expect(sessionInfo).toEqual(sessionInfoResult);
            },
            () => fail()
        );
    });
});
