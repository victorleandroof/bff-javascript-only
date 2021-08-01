import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/step-definitions'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  modulePathIgnorePatterns: ['dist'],
  modulePaths: ['<rootDir>', 'src'],
  setupFilesAfterEnv: ['./regression/config.ts'],
  testMatch: [
    "**/*.steps.ts"
  ]
};

export default config;
