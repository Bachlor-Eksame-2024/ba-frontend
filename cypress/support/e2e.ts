import '@testing-library/cypress/add-commands';
import './commands.ts';

export {};

type CustomCommands = {
  login(email: string, password: string): Cypress.Chainable<void>;
  logout(): Cypress.Chainable<void>;
};

declare module 'cypress' {
  interface Chainable extends CustomCommands {
    // Add specific command implementations
    login(email: string, password: string): Chainable<void>;
    logout(): Chainable<void>;
  }
}

// Example command implementations
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
});
