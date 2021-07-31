import { Injectable } from '@nestjs/common';
import { ApplicationConfig } from '@srcapplication.config';
import * as winston from 'winston';

@Injectable()
export class Logger {
    private static loggerWinston: winston.Logger;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance() {
        if (!Logger.loggerWinston) {
            Logger.loggerWinston = winston.createLogger({
                format: winston.format.combine(Logger.custonFormat()),
                transports: new winston.transports.Console(),
                defaultMeta: { service: 'bff-login' },
                level: ApplicationConfig.LOG_LEVEL,
            });
        }
        return this.loggerWinston;
    }

    private static custonFormat(): any {
        return winston.format.printf((info) => {
            if (info.meta instanceof Error) {
                return JSON.stringify({
                    level: info.level,
                    message: info.message,
                    stack: info.meta.stack,
                });
            }
            return JSON.stringify({
                level: info.level,
                message: info.message,
                data: info.meta || {},
            });
        });
    }
}
