import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { startMock } from './base';
import { join } from 'path';
import { Browser, launch, Page} from 'puppeteer';
import * as mockttp from 'mockttp';
import { getConfigRegression } from '../regression';

const sleep = async (ms: number) =>
	await new Promise((res) => setTimeout(res, ms))

const feature = loadFeature(join(__dirname, '../features/regression.feature'));

const seletorcs = {
    page: '[data-test-home-page]',
    formSubmit: '[data-test-form-submit]',
}

let browser: Browser;
let page: Page;
const mockServer: mockttp.Mockttp = mockttp.getLocal();;

const openPageLogin = (and: DefineStepFunction) => {
    and(/^acessar a página de login$/, async () => {
        await page.waitForSelector(seletorcs.page, {
            visible: true
        });
    });
}
const validateRegressionVisual = (then: DefineStepFunction) => {
    then(/^devo validar a tela "(.*)"$/, async (tela: string) => {
        const image = await page.screenshot({ fullPage: true });
        const customDiffDir = join(__dirname, '../regression/__image_snapshots__/baseline/', tela);
        const customSnapshotsDir = join(__dirname, '../regression/__image_snapshots__/', tela);
        const config = getConfigRegression(customDiffDir, customSnapshotsDir);
        expect(image).toMatchImageSnapshot(config);
    });
}

const pressButtonSubmit = (when: DefineStepFunction) => {
    when(/^quando precionsar o botão de entrar$/, async() => {
        await page.click(seletorcs.formSubmit);
    });
}

defineFeature(feature, (test) => {

    beforeEach(async () => {
        mockServer.start(4567);
        browser = await launch({
            headless: false,
            executablePath: process.env.CHROME_BIN,
            args: ['--no-sandbox', '--disable-dev-shm-usage']
        });
        page = await browser.newPage();
        await page.goto("http://localhost:8080/");
    },30_000);

    afterEach(async () => { 
        await browser?.close?.();
        await mockServer?.stop?.();
    });

    test('Deve validar a regressão visual da tela de erro', async({ given, when, then, and }) => {
        startMock(given, mockServer);
        openPageLogin(and);
        pressButtonSubmit(when);
        validateRegressionVisual(then);
    });

    test('Deve validar a regressão visual da tela de login', ({ given, then, and }) => {
        startMock(given, mockServer);
        openPageLogin(and);
        validateRegressionVisual(then)
    });
});