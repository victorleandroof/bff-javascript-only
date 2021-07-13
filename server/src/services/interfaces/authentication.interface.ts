export interface ILogin {
    username: string;
    password: string;
}

export interface IOauth {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string[];
}

export interface IAuthenticationSession {
    token: string;
    scopes: string[];
    userId: string;
    created_at: number;
    expiration_at: number;
}

export interface ISessionInfo {
    key: string;
    maxAge: number;
}
