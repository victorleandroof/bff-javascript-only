import { HomeController } from './home.controller';

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
        homeController = new HomeController();
    });

    it('should return assets and default datas when call method', async () => {
        // ACTION
        const response = await homeController.index();
        // ASSERT
        expect(response).toEqual(responseResult);
    });
});
