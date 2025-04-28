// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/app/javascript/setupTests.js'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/config/webpack/'],
  };
  