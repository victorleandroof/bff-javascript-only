import { DeepMocked, createMock } from '@golevelup/nestjs-testing';
import { Response, Request } from 'express';
import { RedisClient } from '@infrastructure/redis/redis.interfaces';
import { AuthenticationMiddleware } from './authentication.middleware';
import { Logger } from '@infrastructure/logger/logger';

jest.mock('@src/application.config', () => ({
    ApplicationConfig: {
        SESSION_COOKIE_NAME: 'session',
        ORCHESTRATOR_URL: 'http://localhost/dashboard',
    },
}));

describe('AuthenticationMiddleware', () => {
    const sessionInfoRedisMock = 'sessionInfoMock';
    const requestMock = {
        cookies: {
            session: 'sessionValueMock',
        },
    } as any as Request;

    const loggerMock = {
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
    };

    const nextFunctionMock = jest.fn();
    let authenticationMiddleware: AuthenticationMiddleware;
    let redisClientMock: DeepMocked<RedisClient>;
    let responseMock: DeepMocked<Response>;

    beforeEach(() => {
        redisClientMock = createMock<RedisClient>();
        responseMock = createMock<Response>();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        jest.spyOn(Logger, 'getInstance').mockImplementation(() => loggerMock);
        authenticationMiddleware = new AuthenticationMiddleware(
            redisClientMock
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to dashboard when exist cookie session and session info in redis', async () => {
        // GIVEM
        redisClientMock.get.mockResolvedValueOnce(sessionInfoRedisMock);
        // ACTION
        await authenticationMiddleware.use(
            requestMock,
            responseMock,
            nextFunctionMock
        );
        // ASSERT
        expect(redisClientMock.get).toHaveBeenCalledWith('sessionValueMock');
        expect(responseMock.redirect).toHaveBeenCalledWith(
            'http://localhost/dashboard'
        );
    });

    it('should call next when exist cookie session and not exist session info in redis', async () => {
        // GIVEM
        redisClientMock.get.mockResolvedValueOnce(undefined);
        // ACTION
        await authenticationMiddleware.use(
            requestMock,
            responseMock,
            nextFunctionMock
        );
        // ASSERT
        expect(redisClientMock.get).toHaveBeenCalledWith('sessionValueMock');
        expect(nextFunctionMock).toBeCalled();
    });

    it('should call next when not exist cookie session and not exist session info in redis', async () => {
        // GIVEM
        requestMock.cookies = {};
        // ACTION
        await authenticationMiddleware.use(
            requestMock,
            responseMock,
            nextFunctionMock
        );
        // ASSERT
        expect(nextFunctionMock).toBeCalled();
    });
});
