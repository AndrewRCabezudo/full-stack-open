const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let books = [
    {
      title: "Orientalism",
      author: "Edward W. Said",
      published: "Pantheon Books 1978",
      genres: "non-fiction",
    },
    {
      title: "A Scanner Darkly",
      author: "Philip K Dick",
      published: "Doubleday 1977",
      genres: "Science Fiction",
    },
    {
      title: "Do Androids Dream of Electric Sheep",
      author: "Philip K Dick",
      published: "Doubleday 1968",
      genres: "Science Fiction",
    },
    {
      title: "The Silmarillion",
      author: "J.R.R Tolkien",
      published: "George Allen & Unwin 1977",
      genres: "Fantasy",
    },
    {
      title: "The Eye of The World",
      author: "Robert Jordan",
      published: "Tor Books 1990",
      genres: "Fantasy",
    },
    {
      title: "Aké: The Years of Childhood",
      author: "Wole Soyinka",
      published: "Random House 1981",
      genres: "Autobiography",
    },
    {
      title: "Freedom from the Known",
      author: "Jiddu Krishnamurti",
      published: "Harper & Row 1969",
      genres: "Philosophy",
    },
    {
      title: "The Lord of The Rings",
      author: "J.R.R Tolkien",
      published: "Allen & Unwin 1954",
      genres: "Fantasy",
    },
]
  
const typeDefs = gql`
    type Author {
      name: String!
      born: Int
      bookCount: Int!
    }
    type Book {
      title: String!
      author: String!
      published: String!
      genres: String!
      id: ID!
    }
    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
    }
    type Mutation {
      addBook(
        title: String!
        author: String!
        published: String!
        genres: String!
      ): Book,
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
    }

`
const resolvers = {
    Query: {
      bookCount: () => books.length,
      authorCount: () => {
        const authors = [... new Set(books.map((item) => item.author))]
        return authors.length
      },
      allBooks: (root, args) => {
        if (args.author && args.genre) {
          const authorGenreBooks = new Array()
          books.forEach(book => {
            if ((book.author === args.author) && (book.genres === args.genre) ) {
              authorGenreBooks.push(book)
            }
          })
          return authorGenreBooks
        } else if (args.author) {
          const authorsBooks = new Array()
          books.forEach(book => {
            if (book.author === args.author) {
              authorsBooks.push(book)
            }
          })
          return authorsBooks
        } else if (args.genre) {
          const booksOfGenre = new Array()
          books.forEach(book => {
            if (book.genres === args.genre) {
              booksOfGenre.push(book)
            }
          })
          return booksOfGenre
        } else {
          return books
        }
      },
      allAuthors: () => {
        const authors = new Array()
        books.map(book => {
          const authortoUpdate =(authors.find(a => a.name === book.author))
          if (authortoUpdate) {
            index = authors.findIndex((a => a.name === authortoUpdate.name))
            authors[index].bookCount = authors[index].bookCount + 1
          } else {
            authors.push({name: book.author, bookCount: 1 })
          }
        })
        return authors
      }
    },

    Mutation: {
      addBook:(root, args) => {
        books = books.concat(args)
        return args
      },
      editAuthor:(root, args) => {
        const author = {name: "", born: ""}
          books.forEach(book => {
            if (book.author === args.name) {
              author.born = args.setBornTo
              author.name = args.name
            }
          })
        return author
      }
     }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
  
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})