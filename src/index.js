const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers.js');
const config = require('./config/config.js');

const mongodb = config.mongodb;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = config.port;

mongoose
  .connect(mongodb, { useNewUrlParser: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
