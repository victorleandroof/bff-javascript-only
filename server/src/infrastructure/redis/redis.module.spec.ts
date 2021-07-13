import { RedisModule } from './redis.module';
import { RedisClientType } from './redis.interfaces';
import { RedisConnectionFactory } from './redis.connection';
import { createMock } from '@golevelup/nestjs-testing';
import IORedis from 'ioredis';

describe('RedisModule', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a Module configuration when register is called', function () {
        //arrange
        jest.mock('./redis.connection');
        const mockRedisClient = createMock<IORedis.Redis>();
        jest.spyOn(RedisConnectionFactory, 'create').mockReturnValueOnce(
            mockRedisClient
        );

        //act
        const dynamicModule = RedisModule.register([
            {
                name: 'UnitTest1',
                clientType: RedisClientType.Redis,
                host: 'redis://localhost',
                port: 6379,
            },
        ]);

        //assert
        const expectedProviders = [
            {
                provide: 'UnitTest1',
                useValue: mockRedisClient,
            },
        ];
        expect(dynamicModule).toEqual({
            module: RedisModule,
            providers: expectedProviders,
            exports: expectedProviders,
        });
    });

    it('should return a provider for each given RedisModuleOptions', function () {
        //arrange
        jest.mock('./redis.connection');

        const mockRedisClient1 = createMock<IORedis.Redis>();
        const mockRedisClient2 = createMock<IORedis.Redis>();
        jest.spyOn(RedisConnectionFactory, 'create')
            .mockReturnValueOnce(mockRedisClient1)
            .mockReturnValueOnce(mockRedisClient2);
        const config = {
            clientType: RedisClientType.Redis,
            host: 'redis://localhost',
            port: 6379,
        };

        //act
        const dynamicModule = RedisModule.register([
            Object.assign({ name: 'UnitTest1' }, config),
            Object.assign({ name: 'UnitTest2' }, config),
        ]);

        //assert
        const expectedProviders = [
            {
                provide: 'UnitTest1',
                useValue: mockRedisClient1,
            },
            {
                provide: 'UnitTest2',
                useValue: mockRedisClient2,
            },
        ];
        expect(dynamicModule).toEqual({
            module: RedisModule,
            providers: expectedProviders,
            exports: expectedProviders,
        });
    });
});
