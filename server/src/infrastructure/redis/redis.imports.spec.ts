import { RedisImportFactory } from './redis.imports';
import { Logger } from '@infrastructure/logger/logger';
import * as winston from 'winston';

jest.mock(
    '@src/application.config',
    jest.fn().mockReturnValue({
        ApplicationConfig: {
            REDIS_SENTINELS: '127.0.0.1:26379,127.0.0.1:26380',
            REDIS_CLIENT_TYPE: 'Redis',
            REDIS_HOST: 'localhost',
            REDIS_PORT: '6379',
        },
    })
);

describe('RedisImportFactory', () => {
    const loggerMock = {
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
    };

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        jest.spyOn(Logger, 'getInstance').mockImplementation(() => loggerMock);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return config for REDIS default', () => {
        const redisImport = RedisImportFactory.create();
        expect(redisImport).toEqual({
            clientType: 0,
            host: 'localhost',
            listeners: expect.any(Array),
            name: 'Redis',
            port: 6379,
        });
    });

    it('should return log message for redis listeners and validate logsW', () => {
        const redisImport = RedisImportFactory.create();
        callAllListeners(redisImport.listeners);
        expect(loggerMock.error.mock.calls).toEqual([
            ['(RedisListener)', 'myTest'],
        ]);
        expect(loggerMock.info.mock.calls).toEqual([
            ['(RedisListener) - Connected'],
            ['(RedisListener) - Ready'],
            ['(RedisListener) - Closed'],
            ['(RedisListener) - Reconnecting'],
            ['(RedisListener) - Ended'],
        ]);
    });

    function callAllListeners(listeners) {
        listeners.forEach((listener) => {
            if (listener.event === 'error') {
                listener.listener('myTest');
            } else {
                listener.listener();
            }
        });
    }
});
