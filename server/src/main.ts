import './module-alias';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApplicationConfig } from '@src/application.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { LoginModule } from '@src/login.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(LoginModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser(ApplicationConfig.COOKIE_SECRETE_KEY));
    app.useStaticAssets(join(__dirname, ApplicationConfig.ASSETS_PATH), {
        prefix: `/${ApplicationConfig.APP_PREFIX}/public`,
    });
    app.disable('x-powered-by');
    app.disable('etag');
    app.setBaseViewsDir(join(__dirname, ApplicationConfig.VIEWS_PATH));
    app.setViewEngine('hbs');

    await app.listen(ApplicationConfig.PORT, () => {
        Logger.log(`listing in ${ApplicationConfig.PORT}`);
    });
}
bootstrap();
