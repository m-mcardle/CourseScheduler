/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    // URL will prepended based on `baseUrl`, can be set w/ CYPRESS_BASE_URL
    cy.visit('/')
  })

  it('displays selection panel and schedule', () => {
    cy.get('#selection-panel').should('have.length', 1)
    cy.get('#schedule').should('have.length', 1)
  })

  it('can select and remove course', () => {
    const course = 'ACCT*1220*0101 (6573) Intro Financial Accounting'
    cy.get('#course-input')
      .first()
      .type(`${course}{enter}`)

    cy.get('#course-submit')
      .first()
      .click()
  
    // Assert course was added
    cy.get('#schedule').should('contain.text', 'ACCT*1220*0101')

    cy.get('#course-delete')
      .first()
      .click()

    cy.get('#dialog-confirm')
      .click()

    // Assert course was removed
    cy.get('#schedule').should('not.contain.text', 'ACCT*1220*0101')
  })
})
