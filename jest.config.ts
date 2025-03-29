import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testTimeout: 1000 * 60 * 5,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  testMatch: ['**/*.spec.ts'],
  rootDir: '.',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

//   reporters: [
//       'default',
//       ['jest-junit', {outputDirectory: 'test/reports/junit'}]
//   ],

  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts, tsx}',
    '!src/**/*.{d.ts, d.tsx}',
  ],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage/dev',

//   globalSetup: '<rootDir>/test/globalSetup.ts',
//   globalTeardown: '<rootDir>/test/globalTeardown.ts',
//   setupFiles: ['<rootDir>/test/setEnvVars.jest.ts'],
//   setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts']
};

export default config;
