import { DefineStepFunction } from 'jest-cucumber';
import { Mockttp } from 'mockttp';
import { join } from 'path';

export const startMock = (given: DefineStepFunction, mockServer: Mockttp) => {
    given(/^um usuário que "(.*)"$/, (scenario) => {
        if(scenario === 'possua_cadastro') {
            mockServer.post('/v1/userprofile').thenFromFile(200, join(__dirname, `../requests/${scenario}/user_response.json`));
            mockServer.post('/v1/oauth2/token').thenFromFile(200, join(__dirname, `../requests/${scenario}/login_response.json`));
        } else if(scenario === 'tentativa_login_erro_ao_gerar_token') {
            mockServer.post('/v1/oauth2/token').thenFromFile(500, join(__dirname, `../requests/${scenario}/login_response.json`));
        } else if(scenario === 'tentativa_login_erro_user') {
            mockServer.post('/v1/userprofile').thenFromFile(500, join(__dirname, `../requests/${scenario}/user_response.json`));
            mockServer.post('/v1/oauth2/token').thenFromFile(200, join(__dirname, `../requests/${scenario}/login_response.json`));
        }       
    });
}