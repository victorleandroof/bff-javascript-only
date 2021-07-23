import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/src/'],
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    reporters: ['default', 'jest-junit'],
    coverageDirectory: '../.ci/reports/server',
    coverageReporters: ['text', 'clover', 'lcov', 'json-summary'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/application.config.ts',
        '<rootDir>/src/main.ts',
        '<rootDir>/src/login.module.ts',
        '<rootDir>/src/module-alias.ts',
    ],
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
