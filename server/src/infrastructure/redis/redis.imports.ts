/* eslint-disable max-lines-per-function */
import {
    RedisClientType,
    RedisConnectionEvent,
    RedisModuleOptions,
} from './redis.interfaces';
import { ApplicationConfig } from '@src/application.config';
import { ClusterOptions, RedisOptions } from 'ioredis';
import { Logger } from '@infrastructure/logger/logger';

export class RedisImportFactory {
    public static create(options?: ClusterOptions | RedisOptions) {
        switch (RedisClientType[ApplicationConfig.REDIS_CLIENT_TYPE]) {
            default:
                return this.createDefaultImport(options);
        }
    }

    private static createDefaultImport(
        options?: ClusterOptions | RedisOptions
    ): RedisModuleOptions {
        return {
            clientType: RedisClientType[ApplicationConfig.REDIS_CLIENT_TYPE],
            host: ApplicationConfig.REDIS_HOST,
            listeners: RedisImportFactory.getRedisEventListeners(),
            name: 'Redis',
            port: parseInt(ApplicationConfig.REDIS_PORT),
            options,
        };
    }

    private static getRedisEventListeners() {
        return [
            {
                event: RedisConnectionEvent.error,
                listener: (error) =>
                    Logger.getInstance().error('(RedisListener)', error),
            },
            {
                event: RedisConnectionEvent.connect,
                listener: () =>
                    Logger.getInstance().info(`(RedisListener) - Connected`),
            },
            {
                event: RedisConnectionEvent.ready,
                listener: () =>
                    Logger.getInstance().info(`(RedisListener) - Ready`),
            },
            {
                event: RedisConnectionEvent.close,
                listener: () =>
                    Logger.getInstance().info(`(RedisListener) - Closed`),
            },
            {
                event: RedisConnectionEvent.reconnecting,
                listener: () =>
                    Logger.getInstance().info(`(RedisListener) - Reconnecting`),
            },
            {
                event: RedisConnectionEvent.end,
                listener: () =>
                    Logger.getInstance().info(`(RedisListener) - Ended`),
            },
        ];
    }
}
