// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('isElementDisplayed', (locator, timeout = 10000) => {
  cy.get('body', { timeout: timeout }).then($body => {
    const exists = $body.find(locator).length > 0;
    return exists;
  });
});

Cypress.Commands.add('waitUntilElementToBeInvisible', (selector, retries = 5, interval = 2000) => {
  const checkVisibility = (attempt = 1) => {
    return cy.get('body', { log: false }).then($body => {
      const isVisible = $body.find(selector).is(':visible')
      if (!isVisible) {
        cy.log(`${selector} is invisible`)
        return
      }
      if (attempt === retries) {
        cy.log(`${selector} still visible after ${retries * interval / 1000}s. Continuing test`)
        return
      }
      cy.wait(interval, { log: false })
      return checkVisibility(attempt + 1)
    })
  }
  return checkVisibility()
})