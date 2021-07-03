import IORedis, { ClusterOptions, RedisOptions } from 'ioredis';

export interface RedisModuleOptions {
    name: string;
    clientType: RedisClientType;
    host?: string;
    port?: number;
    startupNodes?: Array<{ port: number; host: string }>;
    options?: RedisOptions | ClusterOptions;
    listeners?: RedisConnectionEventListener[];
}

export interface RedisSentinelModuleOptions {
    masterName?: string;
    name: string;
    clientType: RedisClientType;
    sentinels?: Sentinels[];
    role?: string;
    startupNodes?: Array<{ port: number; host: string }>;
    options?: RedisOptions | ClusterOptions;
    listeners?: RedisConnectionEventListener[];
}

export interface Sentinels {
    host: string;
    port: number;
    listeners?: RedisConnectionEventListener[];
}

export enum RedisClientType {
    Redis,
    Cluster,
    Sentinel,
}

export interface RedisConnectionEventListener {
    event: RedisConnectionEvent;
    listener: (...args: any[]) => void;
}

export enum RedisConnectionEvent {
    connect = 'connect',
    ready = 'ready',
    error = 'error',
    close = 'close',
    reconnecting = 'reconnecting',
    end = 'end',
}

export type RedisClient = IORedis.Cluster | IORedis.Redis;
