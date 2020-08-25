const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");
const usersUrl = "http://localhost:9000";
const historiesUrl = "http://localhost:9005";
const userSchema = require("./schema/userSchema");
const historySchema = require("./schema/historySchema");

const schema = makeExecutableSchema({
  typeDefs: [userSchema.typeDefs, historySchema.typeDefs],
  resolvers: [userSchema.resolvers, historySchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen(9003).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
