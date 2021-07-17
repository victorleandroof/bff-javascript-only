import { defineFeature, loadFeature } from 'jest-cucumber';
import { startMock } from './base';
import { join } from 'path';
import { Browser, launch, Page} from 'puppeteer';
import * as mockttp from 'mockttp';

const sleep = async (ms: number) =>
	await new Promise((res) => setTimeout(res, ms))

const feature = loadFeature(join(__dirname, '../features/login.feature'));

defineFeature(feature, (test) => {

    let browser: Browser;
    let page: Page;
    const mockServer: mockttp.Mockttp = mockttp.getLocal();;
    const seletorcs = {
        page: '[data-test-home-page]',
        createAccountTitle: '[data-test-create-account-title]',
        createAccountSubtitle: '[data-test-create-account-subtitle]',
        createAccountLink: '[data-test-create-account-link]',
        toastError: '[data-test-toast]',
        formLogin: '[data-test-form-login]',
        inputUsername: '[data-test-input-username]',
        inputPassword: '[data-test-input-password]',
        formLoading: '[data-test-form-loading]',
        formSubmit: '[data-test-form-submit]',
        resetPassword: '[data-test-reset-password]'
    }

    beforeEach(async () => {
        mockServer.start(4567)
        browser = await launch({
            headless: false,
            devtools: true
        });
        page = await browser.newPage();
        await page.goto("http://localhost:8080/login");
    });

    afterEach(async () => { 
        await browser?.close?.();
        await mockServer?.stop?.();
    });

    test('Deve efetuar login com sucesso e redicionar para dashboard', ({ given, when, then, and }) => {
        startMock(given, mockServer);

        and(/^acessar a página de login$/, async () => {
            await page.waitForSelector(seletorcs.page, {
                visible: true
            });
        });

        and(/^preencher campo usuário com valor "(.*)"$/, async (username: string) => {
            await page.type(seletorcs.inputUsername, username);
        });

        and(/^preencher campo senha com valor "(.*)"$/, async (password: string) => {
            await page.type(seletorcs.inputPassword, password);
        });

        when(/^quando precionsar o botão de entrar$/, async() => {
            await page.click(seletorcs.formSubmit);
        });

        then(/^devo visualizar a tela de "(.*)"$/, async (tela) => {await sleep(1000);
            await expect(page.url()).toEqual('http://localhost:8080/dashboard')
        });
    });
});