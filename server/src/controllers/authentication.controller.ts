import { ApiExceptionFilter } from '@controllersfilter/api-exception.filter';
import { Body, Controller, Post, Res, UseFilters } from '@nestjs/common';
import { AuthenticationService } from '@services/authentication.service';
import { ApplicationConfig } from '@src/application.config';
import { Response } from 'express';
import { AuthenticationRequest } from './requests/authentication.request';

@Controller(`${ApplicationConfig.APP_PREFIX}`)
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
        const sessionInfo = await this.authenticationService
            .getSessionInfo(authenticationRequest)
            .toPromise();
        response.cookie(
            ApplicationConfig.SESSION_COOKIE_NAME,
            sessionInfo.key,
            {
                domain: ApplicationConfig.COOKIE_DOMAIN_VALIDATION,
                maxAge: sessionInfo.maxAge,
            }
        );
        return response.json({ url: ApplicationConfig.ORCHESTRATOR_URL });
    }
}
