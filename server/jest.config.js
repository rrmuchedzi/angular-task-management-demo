module.exports = {
    testEnvironment: 'node',
    testRegex: '^.*\\.spec.jsx?$',
    testTimeout: 120000,
    silent: false,
    collectCoverage: false, // https://github.com/facebook/jest/issues/5739,
    slowTestThreshold: 30,
    verbose: false,
    roots: ['<rootDir>/dist/server/src'],
    moduleFileExtensions: ['json', 'js'],
    setupFilesAfterEnv: ['@alex_neo/jest-expect-message', '<rootDir>/dist/server/src/test/serverTestSetup.js'],
  };