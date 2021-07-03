import { IsEmail, IsNotEmpty } from 'class-validator';
import { ErrorMessage } from './enums/error-message.enum';

export class AuthenticationRequest {
    @IsEmail(undefined, { message: ErrorMessage.EMAIL_INVALID })
    email: string;

    @IsNotEmpty({ message: ErrorMessage.PASSWORD_INVALID })
    password: string;
}
