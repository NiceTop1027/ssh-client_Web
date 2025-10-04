describe('SSH Connection', () => {
  it('should connect to the SSH server and show the terminal', () => {
    cy.visit('/connect');
    cy.get('input[placeholder="Server Address"]').type('localhost');
    cy.get('input[placeholder="Port"]').type('22');
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('testpassword');
    cy.get('button').contains('Connect').click();
    cy.get('.xterm-screen').should('be.visible');
  });
});
