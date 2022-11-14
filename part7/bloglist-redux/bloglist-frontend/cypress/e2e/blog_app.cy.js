describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Thomas Anderson',
      username: 'Neo',
      password: 'wyterabit',
    }
    const altUser = {
      name: 'MrSmith',
      username: 'Agent',
      password: 'villain',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', altUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('Neo')
      cy.get('#password').type('wyterabit')
      cy.get('#login-button').click()

      cy.contains('Thomas Anderson logged-in')
    })
    it('fails with wrong credentials', function () {
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Neo', password: 'wyterabit' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('[data-testid="title"]').type('Allegory of the cave')
      cy.get('[data-testid="author"]').type('Plato')
      cy.get('[data-testid="url"]').type('www.imagine.io')

      cy.get('#create-button').click()
      cy.contains('Allegory of the cave Plato')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Visit to the Oracle of Delphi',
          author: 'Socrates',
          url: 'www.philosophynow.edu',
        })
      })

      it('user can like a blog', function () {
        //cy.contains('Visit to the Oracle of Delphi')
        cy.contains('view').click()
        cy.get('#like-button').click()
      })
      it('user can remove blog they created', function () {
        //cy.contains('Visit to the Oracle of Delphi')
        cy.contains('view').click()
        cy.get('#remove-button').click()

        cy.get('.success')
          .should('contain', 'blog was removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Visit to the Oracle of Delphi')
      })
      it('user cannot remove blog created by other user', function () {
        cy.contains('blogs')
        cy.get('#logout-button').click()

        cy.login({ username: 'Agent', password: 'villain' })

        cy.contains('view').click()

        cy.get('html').should('not.contain', '#remove-button')
      })
      it('blogs are ordered according to likes', function () {
        cy.contains('blogs')
        cy.createBlog({
          title: 'On Simulacra and Simulation',
          author: 'Jean Baudrillard',
          url: 'www.enterthematrix.io',
        })
        cy.createBlog({
          title: 'Allegory of the cave',
          author: 'Plato',
          url: 'www.fireagainstthewall.com',
        })

        cy.contains('On Simulacra and Simulation')
          .contains('view')
          .click()
          .get('#like-button')
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
        cy.contains('hide').click()

        cy.contains('Allegory of the cave')
          .contains('view')
          .click()
          .get('#like-button')
          .click()
        cy.contains('hide').click()

        cy.contains('Visit to the Oracle of Delphi')
          .contains('view')
          .click()
          .get('#like-button')
          .click()
          .click()
          .click()
          .click()
        cy.contains('hide').click()

        cy.get('.blog').eq(0).should('contain', 'On Simulacra and Simulation')
        cy.get('.blog').eq(1).should('contain', 'Visit to the Oracle of Delphi')
        cy.get('.blog').eq(2).should('contain', 'Allegory of the cave')

        //cy.get('html').should('not.contain', '#remove-button')
      })
    })
  })
})
