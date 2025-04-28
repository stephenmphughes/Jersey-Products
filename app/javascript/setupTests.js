import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn(() => //global.fetch mocks function everywhere in tests
  Promise.resolve({
    json: () => Promise.resolve({ data: [] }),  // always return empty data unless overridden
  })
);
