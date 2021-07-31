import { createMock, DeepMocked } from '@golevelup/nestjs-testing';
import { Logger } from '@infrastructure/logger/logger';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { AuthenticationException } from '@services/exceptions';
import { ApiExceptionFilter } from './api-exception.filter';
import { MessageErrorEnum } from './exception-message.enum';
import * as winston from 'winston';

describe('ApiExceptionFilter', () => {
    const responseSendMock = jest.fn();
    const responseMock = {
        status: jest.fn(() => ({ send: responseSendMock })),
    };
    const loggerMock = {
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn(),
    } as any as winston.Logger;

    let apiExceptionFilter: ApiExceptionFilter;
    let argumentsHostMock: DeepMocked<ArgumentsHost>;

    beforeEach(() => {
        argumentsHostMock = createMock<ArgumentsHost>();
        jest.spyOn(argumentsHostMock, 'switchToHttp').mockImplementation(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            () => {
                return {
                    getResponse: () => responseMock,
                };
            }
        );
        jest.spyOn(Logger, 'getInstance').mockImplementation(() => loggerMock);
        apiExceptionFilter = new ApiExceptionFilter();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return status and mapped message when exception exists in the list', () => {
        // GIVEM
        const authenticationException = new AuthenticationException('error');
        // ACTION
        apiExceptionFilter.catch(authenticationException, argumentsHostMock);
        // ASSERT
        expect(responseMock.status.mock.calls).toEqual([
            [HttpStatus.INTERNAL_SERVER_ERROR],
        ]);
        expect(responseSendMock.mock.calls).toEqual([
            [
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: MessageErrorEnum.INTERNAL,
                },
            ],
        ]);
    });

    it('should return 500 when exception not exists in the list', () => {
        // GIVEM
        const error = new Error('error');
        // ACTION
        apiExceptionFilter.catch(error, argumentsHostMock);
        // ASSERT
        expect(responseMock.status.mock.calls).toEqual([
            [HttpStatus.INTERNAL_SERVER_ERROR],
        ]);
        expect(responseSendMock.mock.calls).toEqual([
            [
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: MessageErrorEnum.INTERNAL,
                },
            ],
        ]);
    });
});
