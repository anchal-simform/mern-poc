const { User } = require("../models/User");
const { AuthenticationError } = require("apollo-server-express");
const { verifyToken, generateToken } = require("../auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      const user = context.user;
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      return user;
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new AuthenticationError("User already exists");
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = generateToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

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
  },
};

module.exports = resolvers;
