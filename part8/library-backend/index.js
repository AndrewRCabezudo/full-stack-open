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
      published: "Science Fiction",
      genres: "Doubleday 1977",
    },
    {
      title: "Do Androids Dream of Electric Sheep",
      author: "Philip K Dick",
      published: "Science Fiction",
      genres: "Doubleday 1968",
    },
    {
      title: "The Silmarillion",
      author: "J.R.R Tolkien",
      published: "Fantasy",
      genres: "George Allen & Unwin 1977",
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
      allBooks: [Book!]!
    }

`
  
const resolvers = {
    Query: {
      bookCount: () => books.length,
      authorCount: () => {
        const authors = [... new Set(books.map((item) => item.author))]
        return authors.length
      },
      allBooks: () => books,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
  
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})