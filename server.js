const { ApolloServer, gql } = require('apollo-server');

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    pages: 1231321
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    pages: 1
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
    pages: Int
  }
  type Query {
    getBooks: [Book]
    hello: String
  }
`;

// Resolvers handle where the data comes from
const resolvers = {
  Query: {
    getBooks: () => books,
    hello: () => {
      return 'Hello, world'
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})