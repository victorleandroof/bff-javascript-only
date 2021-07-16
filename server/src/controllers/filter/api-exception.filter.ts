import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MessageErrorEnum } from './exception-message.enum';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
    private businessToHttpExceptionMap = new Map([
        [
            'AuthenticationException',
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: MessageErrorEnum.INTERNAL,
            },
        ],
    ]);

    public catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response: Response = context.getResponse();
        const httpException = this.businessToHttpExceptionMap.get(
            exception.name
        );
        if (httpException) {
            return response.status(httpException.status).json({
                status: httpException.status,
                message: httpException.message,
            });
        } else {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: MessageErrorEnum.INTERNAL,
            });
        }
    }
}
