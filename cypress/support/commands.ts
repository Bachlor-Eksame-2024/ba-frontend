// cypress/support/commands.ts
export {};

// Extend Cypress interface
declare global {
  interface Cypress {
    Chainable: {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    };
  }
}

// Implement commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
});
