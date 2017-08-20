const { makeExecutableSchema } = require('graphql-tools');

// define types
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
`;

// generate schema object from type definition
module.exports = makeExecutableSchema({ typeDefs });
