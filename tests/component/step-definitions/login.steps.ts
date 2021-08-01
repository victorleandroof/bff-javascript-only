import { defineFeature, DefineStepFunction, loadFeature } from 'jest-cucumber';
import { startMock } from './base';
import { join } from 'path';
import { Browser, launch, Page} from 'puppeteer';
import * as mockttp from 'mockttp';

const sleep = async (ms: number) =>
	await new Promise((res) => setTimeout(res, ms))

const feature = loadFeature(join(__dirname, '../features/login.feature'));

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

let browser: Browser;
let page: Page;
const mockServer: mockttp.Mockttp = mockttp.getLocal();;

const typeUsernameInput = (and: DefineStepFunction) => {
    and(/^preencher campo usuário com valor "(.*)"$/, async (username: string) => {
        await page.type(seletorcs.inputUsername, username);
    });
}

const typePasswordInput = (and: DefineStepFunction) => {
    and(/^preencher campo senha com valor "(.*)"$/, async (password: string) => {
        await page.type(seletorcs.inputPassword, password);
    });
} 

const openPageLogin = (and: DefineStepFunction) => {
    and(/^acessar a página de login$/, async () => {
        await page.waitForSelector(seletorcs.page, {
            visible: true
        });
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
            headless: true,
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

    test('Deve efetuar login com sucesso e redicionar para dashboard', async({ given, when, then, and }) => {
        startMock(given, mockServer);
        openPageLogin(and);
        typeUsernameInput(and);
        typePasswordInput(and);
        pressButtonSubmit(when);
        
        then(/^devo visualizar a tela de "(.*)"$/, async (tela) => {
            await sleep(1000);
            await expect(page.url()).toEqual(`http://localhost:8080/${tela}`)
        });
    });

    test('Deve mostar mensagem de erro padrão - oauth', ({ given, when, then, and }) => {
        startMock(given, mockServer);
        openPageLogin(and);
        typeUsernameInput(and);
        typePasswordInput(and);
        pressButtonSubmit(when);

        then(/^devo visualizar a mensagem "(.*)"$/, async (error) => {
            await sleep(1000);
            const element = await page.waitForSelector(seletorcs.toastError, {
                visible: true,
            });
            const textContent = await element.evaluate(element => element.textContent, element);
            expect(element).toBeDefined();
            expect(textContent).toContain(error)
        });
    });

    test('Deve mostar mensagem de erro padrão - user', ({ given, when, then, and }) => {
        startMock(given, mockServer);
        openPageLogin(and);
        typeUsernameInput(and);
        typePasswordInput(and);
        pressButtonSubmit(when);

        then(/^devo visualizar a mensagem "(.*)"$/, async (error) => {
            await sleep(1000);
            const element = await page.waitForSelector(seletorcs.toastError, {
                visible: true,
            });
            const textContent = await element.evaluate(element => element.textContent, element);
            expect(element).toBeDefined();
            expect(textContent).toContain(error)
        });
    });
});