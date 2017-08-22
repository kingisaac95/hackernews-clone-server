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
  
  type User {
    id: ID!
    name: String!
    email: String
  }

  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }

  type SigninPayload {
    token: String
    user: User
  }

  type Query {
    allLinks: [Link!]!
    allUsers: [User!]!
  }
`;

// generate schema object from type definition
module.exports = makeExecutableSchema({ typeDefs, resolvers });
