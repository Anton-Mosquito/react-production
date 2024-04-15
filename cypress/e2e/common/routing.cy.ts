import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('The user ia authorized', () => {
        it('Transition to the main page', () => {
            cy.visit('/');
            cy.get('[data-testid=MainPage]').should('exist');
        });

        it('Transition to the main page', () => {
            cy.visit('/profile/1');
            cy.get('[data-testid=MainPage]').should('exist');
        });

        it('the user open non exists route', () => {
            cy.visit('/asdasdadadsa');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('The user is not authorized', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('Transition to the profile page', () => {
            cy.visit('/');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Transition open news list', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
