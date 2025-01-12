import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.(test|spec).ts'],
  rootDir: '.',
  clearMocks: true,
  verbose: true,
};

export default config;
