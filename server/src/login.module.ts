import {
    HttpModule,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { AuthenticationMiddleware } from '@middlewares/authentication.middleware';
import { HomeController } from '@controllers/home.controller';
import { AuthenticationController } from '@controllers/authentication.controller';
import { AuthenticationService } from '@services/authentication.service';
import { RedisImportFactory } from '@infrastructureredis/redis.imports';
import { ApplicationConfig } from '@srcapplication.config';
import { RedisModule } from '@infrastructureredis/redis.module';

@Module({
    imports: [
        HttpModule,
        RedisModule.register([
            RedisImportFactory.create({
                password: ApplicationConfig.REDIS_PASSWORD,
            }),
        ]),
    ],
    controllers: [HomeController, AuthenticationController],
    providers: [AuthenticationService],
})
export class LoginModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware).forRoutes(HomeController);
    }
}
