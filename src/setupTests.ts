import '@testing-library/jest-native/extend-expect';

// Mock console.log to avoid noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
