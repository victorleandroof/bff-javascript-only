import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../services/authentication.service';
import { DeepMocked, createMock } from '@golevelup/nestjs-testing';
import { Response } from 'express';
import { ISessionInfo } from '@services/interfaces/authentication.interface';
import { AuthenticationRequest } from '@controllers/requests/authentication.request';
import { of } from 'rxjs';
import { Logger } from '@infrastructure/logger/logger';
import * as winston from 'winston';

jest.mock('@src/application.config', () => ({
    ApplicationConfig: {
        SESSION_COOKIE_NAME: 'session',
        COOKIE_DOMAIN_VALIDATION: 'localhost',
        ORCHESTRATOR_URL: 'http://localhost/dashboard',
    },
}));

describe('authenticationController', () => {
    const sessionInfoMock: ISessionInfo = {
        key: 'sessionid',
        maxAge: 36000,
    };
    const authenticationRequest: AuthenticationRequest = {
        password: '123456',
        username: 'user',
    };
    const loggerMock = {
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
    };

    let authenticationController: AuthenticationController;
    let authenticationServiceMock: DeepMocked<AuthenticationService>;
    let responseMock: DeepMocked<Response>;

    beforeEach(() => {
        authenticationServiceMock = createMock<AuthenticationService>();
        responseMock = createMock<Response>();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        jest.spyOn(Logger, 'getInstance').mockImplementation(() => loggerMock);
        authenticationController = new AuthenticationController(
            authenticationServiceMock
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should authentication user and create cookie with session id and return url to redirect', async () => {
        // GIVEM
        authenticationServiceMock.getSessionInfo.mockReturnValueOnce(
            of(sessionInfoMock)
        );
        // ACTION
        await authenticationController.authentication(
            authenticationRequest,
            responseMock
        );
        // ASSERT
        expect(authenticationServiceMock.getSessionInfo).toHaveBeenCalledWith(
            authenticationRequest
        );
        expect(responseMock.cookie).toHaveBeenCalledWith(
            'session',
            sessionInfoMock.key,
            {
                domain: 'localhost',
                expires: new Date(sessionInfoMock.maxAge),
            }
        );
        expect(responseMock.json).toHaveBeenCalledWith({
            url: 'http://localhost/dashboard',
        });
    });
});
