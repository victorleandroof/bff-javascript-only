import { ApiExceptionFilter } from '@controllers/filter/api-exception.filter';
import { Logger } from '@infrastructure/logger/logger';
import { Body, Controller, Post, Res, UseFilters } from '@nestjs/common';
import { AuthenticationService } from '@services/authentication.service';
import { ApplicationConfig } from '@src/application.config';
import { Response } from 'express';
import { AuthenticationRequest } from './requests/authentication.request';

@Controller('/')
@UseFilters(ApiExceptionFilter)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post()
    public async authentication(
        @Body() authenticationRequest: AuthenticationRequest,
        @Res() response: Response
    ) {
        Logger.getInstance().debug(
            '(AuthenticationController) - authentication'
        );

        const sessionInfo = await this.authenticationService
            .getSessionInfo(authenticationRequest)
            .toPromise();

        Logger.getInstance().info(
            `(AuthenticationController) - generate session`,
            ApplicationConfig.ORCHESTRATOR_URL
        );

        response.cookie(
            ApplicationConfig.SESSION_COOKIE_NAME,
            sessionInfo.key,
            {
                domain: ApplicationConfig.COOKIE_DOMAIN_VALIDATION,
                expires: new Date(sessionInfo.maxAge),
            }
        );
        response.json({ url: ApplicationConfig.ORCHESTRATOR_URL });
    }
}
