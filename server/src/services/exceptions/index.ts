export class AuthenticationException extends Error {
    public name = 'AuthenticationException';
    constructor(response) {
        super(response);
        Object.setPrototypeOf(this, AuthenticationException.prototype);
    }
}
