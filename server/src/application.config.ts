import { env } from 'process';

export abstract class ApplicationConfig {
    public static readonly PORT = env.PORT;
    public static readonly ASSETS_PATH = env.ASSETS_PATH;
    public static readonly VIEWS_PATH = env.VIEWS_PATH;
    public static readonly APP_PREFIX = env.APP_PREFIX;
    public static readonly COOKIE_SECRETE_KEY = env.COOKIE_SECRETE_KEY;
    public static readonly SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME;
    public static readonly REDIS_CLIENT_TYPE = env.REDIS_CLIENT_TYPE || 'Redis';
    public static readonly REDIS_HOST = env.REDIS_HOST;
    public static readonly REDIS_PORT = env.REDIS_PORT;
    public static readonly REDIS_PASSWORD = env.REDIS_PASSWORD;
    public static readonly ORCHESTRATOR_URL = env.ORCHESTRATOR_URL;
    public static readonly LOGIN_MS_URL = env.LOGIN_MS_URL;
    public static readonly USER_MS_URL = env.USER_MS_URL;
    public static readonly COOKIE_DOMAIN_VALIDATION =
        env.COOKIE_DOMAIN_VALIDATION;
    public static readonly LOG_LEVEL = env.LOG_LEVEL || 'debug';
}
