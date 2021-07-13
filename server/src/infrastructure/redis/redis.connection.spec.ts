import { RedisConnectionFactory } from './redis.connection';
import { RedisClientType, RedisConnectionEvent } from './redis.interfaces';
import * as IORedis from 'ioredis';

jest.mock('ioredis');

describe('RedisConnectionFactory', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a redis connection using host when the host is provided and the client type is Redis', function () {
        //act
        const redis = RedisConnectionFactory.create({
            name: 'UnitTest',
            host: 'host-unit-test',
            clientType: RedisClientType.Redis,
        });
        jest.spyOn(redis, 'on');

        //assert
        expect(IORedis).toHaveBeenCalledTimes(1);
        expect(IORedis).toHaveBeenCalledWith(
            undefined,
            'host-unit-test',
            undefined
        );
        expect(redis.on).not.toBeCalled();
    });

    it('should create a redis connection using host when the host is provided and the client type is Redis and listeners are present', function () {
        //act
        const redis = RedisConnectionFactory.create({
            name: 'UnitTest',
            host: 'host-unit-test',
            clientType: RedisClientType.Redis,
            listeners: [
                {
                    event: RedisConnectionEvent.connect,
                    listener: jest.fn(),
                },
            ],
        });
        jest.spyOn(redis, 'on');

        //assert
        expect(IORedis).toHaveBeenCalledTimes(1);
        expect(IORedis).toHaveBeenCalledWith(
            undefined,
            'host-unit-test',
            undefined
        );
        expect(redis.on).toBeCalledWith('connect', expect.any(Function));
    });

    it('should create a redis connection using host and port when both are provided and the client type is Redis', function () {
        //act
        const redis = RedisConnectionFactory.create({
            name: 'UnitTest',
            host: 'host-unit-test',
            port: 1234,
            clientType: RedisClientType.Redis,
        });
        jest.spyOn(redis, 'on');

        //asert
        expect(IORedis).toHaveBeenCalledTimes(1);
        expect(IORedis).toHaveBeenCalledWith(1234, 'host-unit-test', undefined);
        expect(redis.on).not.toBeCalled();
    });

    it('should create a redis connection using option when it is provided and the client type is Redis', function () {
        //act
        const options = {
            host: 'host-unit-test',
            port: 1234,
        };
        const redis = RedisConnectionFactory.create({
            name: 'UnitTest',
            options: options,
            clientType: RedisClientType.Redis,
        });
        jest.spyOn(redis, 'on');

        expect(IORedis).toHaveBeenCalledTimes(1);
        expect(IORedis).toHaveBeenCalledWith(undefined, undefined, options);
        expect(redis.on).not.toBeCalled();
    });

    it('should create a cluster connection using startupNodes when it is provided and the client type is Cluster', function () {
        const startupNodes = [{ port: 1234, host: 'host-unit-test' }];

        const redis = RedisConnectionFactory.create({
            name: 'UnitTest',
            startupNodes: startupNodes,
            clientType: RedisClientType.Cluster,
        });
        jest.spyOn(redis, 'on');

        expect(IORedis.Cluster).toHaveBeenCalledTimes(1);
        expect(IORedis.Cluster).toHaveBeenCalledWith(startupNodes, undefined);
        expect(redis.on).not.toBeCalled();
    });

    it('should create a cluster connection using startupNodes when it is provided and the client type is Cluster and listeners are present', function () {
        const startupNodes = [{ port: 1234, host: 'host-unit-test' }];

        const redis = RedisConnectionFactory.create({
            name: 'UnitTest',
            startupNodes: startupNodes,
            clientType: RedisClientType.Cluster,
            listeners: [
                {
                    event: RedisConnectionEvent.connect,
                    listener: jest.fn(),
                },
            ],
        });
        jest.spyOn(redis, 'on');

        expect(IORedis.Cluster).toHaveBeenCalledTimes(1);
        expect(IORedis.Cluster).toHaveBeenCalledWith(startupNodes, undefined);
        expect(redis.on).toBeCalledWith('connect', expect.any(Function));
    });

    it('should create a cluster connection using startupNodes and options when both are provided and the client type is Cluster ', function () {
        const startupNodes = [{ port: 1234, host: 'host-unit-test' }];

        const redis = RedisConnectionFactory.create({
            name: 'UniteTest',
            startupNodes: startupNodes,
            clientType: RedisClientType.Cluster,
            options: {
                maxRedirections: 1,
            },
        });
        jest.spyOn(redis, 'on');

        expect(IORedis.Cluster).toHaveBeenCalledTimes(1);
        expect(IORedis.Cluster).toHaveBeenCalledWith(startupNodes, {
            maxRedirections: 1,
        });
        expect(redis.on).not.toBeCalled();
    });
});
