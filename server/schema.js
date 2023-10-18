const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Query {
    me: User
  }

  type Mutation {
    register(username: String, email: String, password: String): User
    login(email: String, password: String): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
