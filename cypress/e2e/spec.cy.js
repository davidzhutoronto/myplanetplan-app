describe('Testing visiting a website', () => {
  it('visit google', () => {
    cy.visit('http://www.google.com');
  });
});
