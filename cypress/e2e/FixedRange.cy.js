describe('FixedRange Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/exercise2');
  });

  it('displays loading indicator while fetching data', () => {
    cy.get('.loading').should('exist');
    cy.get('.range-slider').should('not.exist');
  });

  it('displays range slider after fetching data', () => {
    cy.intercept('GET', 'http://demo1209414.mockable.io/fixed', { fixture: 'fixed_values.json' }).as('fetchFixedValues');

    cy.wait('@fetchFixedValues');

    cy.get('.loading').should('not.exist');
    cy.get('.range-slider').should('exist');
  });
  it('allows dragging and updating min value', () => {
    cy.intercept('GET', 'http://demo1209414.mockable.io/fixed', { fixture: 'fixed_values.json' }).as('fetchFixedValues');
    cy.wait('@fetchFixedValues');

    cy.get('.slider-bullet').eq(0).trigger('mousedown', { clientX: 1 });
    cy.get('.slider-bullet').eq(0).trigger('mousemove', { clientX: 100 });
    cy.get('.values .value-label').eq(0).should('contain', '5.99€');
  });
  it('allows dragging and updating max value', () => {
    cy.intercept('GET', 'http://demo1209414.mockable.io/fixed', { fixture: 'fixed_values.json' }).as('fetchFixedValues');
    cy.wait('@fetchFixedValues');

    cy.get('.slider-bullet').eq(1).trigger('mousedown', { clientX: 100 });
    cy.get('.slider-bullet').eq(1).trigger('mousemove', { clientX: 1 });

    cy.get('.values .value-label').eq(1).should('contain', '50.99€');
  });
}
)