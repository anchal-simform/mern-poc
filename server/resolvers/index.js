const User = require("../models/User");
const Order = require("../models/Order");
const { AuthenticationError } = require("apollo-server-express");
const { generateToken } = require("../auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      const user = context.user;
      const meUser = await User.findOne({ _id: user?.userId });

      if (!user || !meUser) {
        throw new AuthenticationError("You are not authenticated");
      }
      return meUser;
    },
  },
  Mutation: {
    register: async (_, { username, email, password, fullname, gender }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new AuthenticationError("User already exists");
      }

      const user = new User({ username, email, password, fullname, gender });
      await user.save();

      const token = generateToken(user);
      console.log({ token, user });
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = generateToken(user);
      return { token, user };
    },
    order: async (_, { products, total }, context) => {
      const user = context.user;
      if (!user) {
        throw new AuthenticationError("User not found");
      }
      const order = new Order({ products, total, userId: user?.userId });
      const orderDoc = await order.save();

      return orderDoc;
    },
  },
};

module.exports = resolvers;
