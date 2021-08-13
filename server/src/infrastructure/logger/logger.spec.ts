const logger = {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
};

jest.mock('winston', () => ({
    format: {
        colorize: jest.fn(),
        combine: jest.fn(),
        label: jest.fn(),
        timestamp: jest.fn(),
        printf: jest.fn(),
    },
    createLogger: jest.fn().mockReturnValue(logger),
    transports: {
        Console: jest.fn(),
    },
}));

import { Logger } from './logger';

describe('Logger', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return always the same instance of Logger when function is called', () => {
        // act
        const logger1 = Logger.getInstance();
        const logger2 = Logger.getInstance();

        // assert
        // eslint-disable-next-line no-magic-numbers
        expect(logger1).toBe(logger2);
    });
});
