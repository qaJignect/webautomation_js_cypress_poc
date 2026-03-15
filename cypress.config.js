const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    retries: {
      //runMode: 1,   // when running with `cypress run`
      // openMode: 1   // when running with `cypress open`
    },
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  },
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true
  }
});