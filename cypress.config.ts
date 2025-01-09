/* eslint-disable */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    /* eslint-disable */
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Match test filessupportFile: 'cypress/support/e2e.ts'
  },
  env: {
    VITE_API_URL: 'http://localhost:3000/api',
    VITE_API_KEY: 'test-api-key',
  },
});
