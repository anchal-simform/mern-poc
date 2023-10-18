const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { verifyToken } = require("./auth");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://meet:meet@cluster0.hviqg.mongodb.net/my%2Dpoc%2Ddb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    if (token) {
      try {
        const user = verifyToken(token);
        return { user };
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    }
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server listening on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
