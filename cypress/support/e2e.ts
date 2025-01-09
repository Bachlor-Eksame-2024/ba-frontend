// cypress/support/e2e.ts
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

export {};
