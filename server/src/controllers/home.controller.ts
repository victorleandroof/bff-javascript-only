import { ApiExceptionFilter } from '@controllersfilter/api-exception.filter';
import { Controller, Get, Render, UseFilters } from '@nestjs/common';
import { ApplicationConfig } from '@src/application.config';
import * as appAssets from '@src/assets.json';

@Controller(`${ApplicationConfig.APP_PREFIX}`)
@UseFilters(ApiExceptionFilter)
export class HomeController {
    @Get()
    @Render('index')
    public async index() {
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
