import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/features'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  modulePathIgnorePatterns: ['dist'],
  modulePaths: ['<rootDir>', 'src'],
};

export default config;
