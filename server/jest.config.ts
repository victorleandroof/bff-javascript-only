import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/src/'],
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: '../.ci/reports',
    coverageReporters: ['text', 'clover', 'lcov', 'json-summary'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    modulePathIgnorePatterns: ['dist'],
    modulePaths: ['<rootDir>', 'src'],
    moduleNameMapper: {
        '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@middlewaress/(.*)$': '<rootDir>/src/middlewaress/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
};

export default config;
