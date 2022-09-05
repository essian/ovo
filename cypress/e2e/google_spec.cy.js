const searchTerm = "dogs"

describe('google search', () => {

  beforeEach(() => {
    cy.visit('https://www.google.com')
    cy.contains('button', 'Accept all').click()
  })

  it('returns results for a search term', () => {
    cy.get('[title=Search]').type(`${searchTerm}{enter}`)
    cy.url().should('include', `www.google.com/search?q=${searchTerm}`)
    cy.get(`img[alt="Image result for ${searchTerm}"`)
  })
})