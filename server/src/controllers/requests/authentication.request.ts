import { IsNotEmpty } from 'class-validator';
import { ErrorMessage } from './enums/error-message.enum';

export class AuthenticationRequest {
    @IsNotEmpty({ message: ErrorMessage.USERNAME_INVALID })
    username: string;

    @IsNotEmpty({ message: ErrorMessage.PASSWORD_INVALID })
    password: string;
}
