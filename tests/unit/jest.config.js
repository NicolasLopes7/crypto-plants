const isCI = process.env.CI === 'true'

module.exports = {
  preset: 'ts-jest',
  rootDir: '../../',
  testEnvironment: 'node',
  verbose: true,
  bail: isCI,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: ['lcov'],
  coverageDirectory: '<rootDir>/coverage/unit',
  testMatch: [
    '**/tests/unit/**/*.test.ts',
  ],
  reporters: [
    'default',
    [
      'jest-junit', {
        outputDirectory: 'reports',
        outputName: 'jest-junit-unit.xml',
      },
    ],
  ],
}
