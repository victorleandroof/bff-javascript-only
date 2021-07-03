import {
    RedisClientType,
    RedisModuleOptions,
    RedisSentinelModuleOptions,
} from './redis.interfaces';
import * as IORedis from 'ioredis';

export class RedisConnectionFactory {
    public static create(
        opts: RedisModuleOptions | RedisSentinelModuleOptions
    ): IORedis.Redis | IORedis.Cluster {
        switch (opts.clientType) {
            case RedisClientType.Redis:
                return this.createRedisClient(opts);
                break;
            default:
                return this.createClusterClient(opts);
        }
    }

    private static createRedisClient(opts: RedisModuleOptions): IORedis.Redis {
        const redis = new IORedis(opts.port, opts.host, opts.options);
        if (opts.listeners) {
            opts.listeners.forEach((l) => redis.on(l.event, l.listener));
        }
        return redis;
    }

    private static createClusterClient(opts: RedisModuleOptions) {
        const redisCluster = new IORedis.Cluster(
            opts.startupNodes,
            opts.options
        );
        if (opts.listeners) {
            opts.listeners.forEach((l) => redisCluster.on(l.event, l.listener));
        }
        return redisCluster;
    }
}
