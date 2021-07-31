export interface ILogger {
    info(message: string, data?: any);
    error(message: string, error: any);
    debug(message: string, data?: any);
}
