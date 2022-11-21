/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    // URL will prepended based on `baseUrl`, can be set w/ CYPRESS_BASE_URL
    cy.visit('/')
  })

  it('displays selection panel and schedule', () => {
    cy.get('.selection-panel').should('have.length', 1)
    cy.get('.schedule').should('have.length', 1)
  })

  it('can select and remove course', () => {
    const course = 'ACCT*1220*0101 (6573) Intro Financial Accounting'
    cy.get('.course-input')
      .first()
      .type(`${course}{enter}`)

    cy.get('.course-submit')
      .first()
      .click()
  
    // Assert course was added
    cy.get('.schedule').should('contain.text', 'ACCT*1220*0101')

    cy.get('.course-delete')
      .first()
      .click()

    cy.get('.dialog-confirm')
      .click()

    // Assert course was removed
    cy.get('.schedule').should('not.contain.text', 'ACCT*1220*0101')
  })

  it('can detect and highlight collisions', () => {
    const course_1 = 'ACCT*1220*0101 (6573) Intro Financial Accounting'
    cy.get('.course-input')
      .first()
      .type(`${course_1}{enter}`)

    cy.get('.course-submit')
      .first()
      .click()

    const course_2 = 'ACCT*1220*0102 (6574) Intro Financial Accounting'
    cy.get('.course-input')
      .last()
      .type(`${course_2}{enter}`)

    cy.get('.course-submit')
      .last()
      .click()

    cy.get('.collide')
      .first()
      .should('contain.text', 'ACCT*1220*0102')

    cy.get('.collide')
      .last()
      .should('contain.text', 'ACCT*1220*0101')
  })

  it('can add DE course and not display on schedule', () => {
    const course = 'ACCT*1220*DE01 (6583) Intro Financial Accounting'
    cy.get('.course-input')
      .first()
      .type(`${course}{enter}`)

    cy.get('.course-submit')
      .first()
      .click()
  
    // Assert course was not added to schedule
    cy.get('.schedule').should('not.contain.text', 'ACCT*1220*DE01')
  })

  it('can select a w23 course', () => {
    cy.get('.filter-button').click()

    cy.contains('w23').click()

    cy.get('.close-button').click()

    const course = 'CIS*3110*0101 (1751) Operating Systems'
    cy.get('.course-input')
      .first()
      .type(`${course}{enter}`)

    cy.get('.course-submit')
      .first()
      .click()
  
    // Assert course was added to schedule
    cy.get('.schedule').should('contain.text', 'CIS*3110*0101')
  })
})
