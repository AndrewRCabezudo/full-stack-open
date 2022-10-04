describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Thomas Anderson',
      username: 'Neo',
      password: 'wyterabit'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('Neo')
      cy.get('#password').type('wyterabit')
      cy.get('#login-button').click()

      cy.contains('Thomas Anderson logged-in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Neo')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Thomas Anderson logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Neo', password: 'wyterabit' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('[data-testid="title"]').type('Test Blog created by ')
      cy.get('[data-testid="author"]').type('Cypress Hill')
      cy.get('[data-testid="url"]').type('www.imagine.io')

      cy.get('#create-button').click()
      cy.contains('Test Blog created by Cypress Hill')
    })
    // describe('and a blog exists', function () {
    //   beforeEach(function () {
    //     cy.createBlog({
    //       title: 'another blog cypress',
    //       author: 'Cypress Hill',
    //       url: 'www.sfhills.edu'
    //     })
    //   })

    //   it('custom function can tested', function () {
    //     cy.contains('another blog cypress')
    //   })
    // })
  })
})