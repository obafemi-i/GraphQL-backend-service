const gql = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    token: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(username: String!, password: String!): User
    login(username: String!, password: String!): User
  }
`;

module.exports = typeDefs;
