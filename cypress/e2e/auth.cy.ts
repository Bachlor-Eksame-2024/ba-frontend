import '../support/commands';

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="submit-button"]').should('be.visible');
  });

  it('should login successfully', () => {
    cy.fixture('users').then((users) => {
      cy.get('[data-testid="email-input"]').type(users.testUser.email);
      cy.get('[data-testid="password-input"]').type(users.testUser.password);
      cy.get('[data-testid="submit-button"]').click();

      // Check if login was successful
      cy.get('[data-testid="error-message"]').should('not.exist');
    });
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('wrong@email.com');
    cy.get('[data-testid="password-input"]').type('wrongpass');
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});
