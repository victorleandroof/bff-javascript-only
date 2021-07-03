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
        console.log(exception);
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const httpException = this.businessToHttpExceptionMap.get(
            exception.name
        );
        if (httpException) {
            return response.status(httpException.status).json({
                status: httpException.status,
                message: httpException.message,
            });
        }
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpException.status,
            message: MessageErrorEnum.INTERNAL,
        });
    }
}
