const { ApolloServer, gql } = require('apollo-server');
const cors = require('cors');
const Champion = require('./champion');

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

const champions = [
  new Champion('Ashe', 100),
  new Champion('Vayne', 200)
]

const typeDefs = gql`
  type Book {
    title: String
    author: String
    pages: Int
  }

  type Champion {
    name: String
    attackDamage: Float
  }

  type Query {
    getBooks: [Book]
    hello: String
    getChampions: [Champion]
  }
`;

// Resolvers handle where the data comes from
const resolvers = {
  Query: {
    getBooks: () => books,
    hello: () => {
      return 'Hello, world'
    },
    getChampions: () => champions,
  }
};

const server = new ApolloServer({ typeDefs, resolvers, cors: true });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})