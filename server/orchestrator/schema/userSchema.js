const { gql } = require("apollo-server");
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");
const usersUrl = "http://localhost:9000";

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    score: Int
    access_token: String
  }

  extend type Query {
    users: [User]
    user(username: String): User
  }
  input inputNewUser {
    username: String!
    password: String!
  }
  input inputLoginUser {
    username: String!
    password: String!
  }
  input inputUserUpdate {
    username: String
    score: Int
  }

  extend type Mutation {
    updateUser(user: inputUserUpdate): User
    addUser(user: inputNewUser): User
    loginUser(user: inputLoginUser): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const dataUser = await redis.get("usersGraphql");
      if (dataUser) {
        return JSON.parse(dataUser);
      } else {
        const { data } = await axios.get(`${usersUrl}/users`);

        await redis.set("userGraphql", JSON.stringify(data));
        return data;
      }
    },
    user: async (_, args) => {
      const param = args.username;
      const { data } = await axios.get(`${usersUrl}/users/${param}`);
      await redis.set("userGraphqlByUsername", JSON.stringify(data));
      return data;
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const newUser = {
        username: args.user.username,
        password: args.user.password,
      };

      const result = await axios.post(`${usersUrl}/register`, newUser);
      await redis.del("userGraphql");
      return result.data;
    },

    updateUser: async (_, args) => {
      const updateUser = {
        username: args.user.username,
        score: Number(args.user.score),
      };
      let result = await axios.put(`${usersUrl}/users`, updateUser);
      await redis.del("userGraphql");
      return result.data;
    },

    loginUser: async (_, args) => {
      const loginUser = {
        username: args.user.username,
        password: args.user.password,
      };
      let { data } = await axios.post(`${usersUrl}/login`, loginUser);
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
