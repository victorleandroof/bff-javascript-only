import { HomeController } from './home.controller';
import { Logger } from '@infrastructure/logger/logger';
import * as winston from 'winston';

jest.mock('@src/assets.json', () => ({
    app: { css: '/login/public/css/app.css', js: '/login/public/js/app.js' },
    theme: {
        css: '/login/public/css/theme.css',
        js: '/login/public/js/theme.js',
    },
    '': {
        svg: '/login/public/img/login-banner.svg',
        png: '/login/public/img/logo.png',
        html: '/login/public/index.html',
    },
}));

jest.mock('@src/application.config', () => ({
    ApplicationConfig: {
        APP_PREFIX: 'login',
    },
}));

describe('authenticationController', () => {
    let homeController: HomeController;

    const loggerMock = {
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
    };

    const responseResult = {
        baseUrl: 'login',
        scripts: [
            {
                url: '/login/public/js/app.js',
            },
            {
                url: '/login/public/js/theme.js',
            },
        ],
        styles: [
            {
                url: '/login/public/css/app.css',
            },
            {
                url: '/login/public/css/theme.css',
            },
        ],
    };

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        jest.spyOn(Logger, 'getInstance').mockImplementation(() => loggerMock);
        homeController = new HomeController();
    });

    it('should return assets and default datas when call method', async () => {
        // ACTION
        const response = await homeController.index();
        // ASSERT
        expect(response).toEqual(responseResult);
    });
});
