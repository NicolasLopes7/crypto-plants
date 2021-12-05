const isCI = process.env.CI === 'true'

module.exports = {
  preset: 'ts-jest',
  rootDir: '../../',
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 60000,
  bail: isCI,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: ['lcov'],
  coverageDirectory: '<rootDir>/coverage/integration',
  testMatch: [
    '**/tests/integration/**/*.test.ts',
  ],
  reporters: [
    'default',
    [
      'jest-junit', {
        outputDirectory: 'reports',
        outputName: 'jest-junit-integration.xml',
      },
    ],
  ],
}
