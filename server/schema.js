const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    fullname: String
    gender: String
  }

  type Order {
    _id: String
    products: [Product!]!
    total: Float!
    userId: String
  }

  type Query {
    me: User
    myOrders: [Order!]!
  }

  type Mutation {
    register(
      username: String
      email: String
      password: String
      fullname: String
      gender: String
    ): AuthPayload
    login(email: String, password: String): AuthPayload
    order(products: [ProductInput], total: Float): OrderPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type OrderPayload {
    products: [Product!]!
    total: Float!
  }

  type Product {
    id: Int!
    price: Float
    thumbnail: String!
    title: String!
    description: String!
    buyQty: Int!
  }

  input ProductInput {
    id: Int!
    price: Float
    thumbnail: String!
    title: String!
    description: String!
    buyQty: Int!
  }
`;

module.exports = typeDefs;
