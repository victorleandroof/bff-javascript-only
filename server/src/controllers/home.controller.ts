import { ApiExceptionFilter } from '@controllers/filter/api-exception.filter';
import { Logger } from '@infrastructure/logger/logger';
import { Controller, Get, Render, UseFilters } from '@nestjs/common';
import { ApplicationConfig } from '@src/application.config';
import * as appAssets from '@src/assets.json';

@Controller('/')
@UseFilters(ApiExceptionFilter)
export class HomeController {
    @Get()
    @Render('index')
    public async index() {
        Logger.getInstance().info('(HomeController) - get index page');
        const assetsResponse = this.generateAssets();
        return {
            ...assetsResponse,
            baseUrl: ApplicationConfig.APP_PREFIX,
        };
    }

    private generateAssets() {
        const assetsResponse = {
            styles: [],
            scripts: [],
        };
        Object.values(appAssets).forEach((obj: any) => {
            if (obj.css) {
                assetsResponse.styles.push({ url: obj.css });
            }
            if (obj.js) {
                assetsResponse.scripts.push({ url: obj.js });
            }
        });
        return assetsResponse;
    }
}
