describe('Authentication', () => {
  it('should allow user to login', () => {
    cy.login('ceyek1711@kindomd.com', 'Password1234!');

    // Add assertions
    cy.url().should('include', '/home');
    cy.get('[data-testid="user-profile"]').should('exist');
  });

  it('should show error for invalid credentials', () => {
    cy.login('wrong@email.com', 'wrongpass');

    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});
