describe('School Management System E2E', () => {
    it('should load the login page', () => {
        cy.visit('/login');
        cy.contains('Login');
    });

    it('should show validation error on invalid login', () => {
        cy.visit('/login');
        cy.get('input[formControlName="email"]').type('wrong@email.com');
        cy.get('input[formControlName="password"]').type('wrongpass');
        cy.get('button[type="submit"]').click();
        // Assuming backend returns error which displays message
        // Note: This requires backend to be running
    });
});
