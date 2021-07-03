import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RedisModuleOptions } from './redis.interfaces';
import { RedisConnectionFactory } from './redis.connection';

@Module({})
export class RedisModule {
    static register(configs: RedisModuleOptions[]): DynamicModule {
        const providers = this.createProviders(configs);
        return {
            module: RedisModule,
            providers: providers,
            exports: providers,
        };
    }

    private static createProviders(configs: RedisModuleOptions[]) {
        const providers: Provider[] = [];
        configs.forEach((config) => {
            providers.push({
                provide: config.name,
                useValue: RedisConnectionFactory.create(config),
            });
        });
        return providers;
    }
}
