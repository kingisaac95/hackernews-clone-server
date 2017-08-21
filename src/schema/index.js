const { makeExecutableSchema } = require('graphql-tools');

// get resolvers
const resolvers = require('./resolvers');

// define types
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
  }

  type Query {
    allLinks: [Link!]!
  }
`;

// generate schema object from type definition
module.exports = makeExecutableSchema({ typeDefs, resolvers });
