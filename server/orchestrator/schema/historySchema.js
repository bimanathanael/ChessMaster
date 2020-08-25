const { gql } = require("apollo-server");
const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");
const historiesUrl = "http://localhost:9005";
const typeDefs = gql`
  type History {
    id: Int
    player: String
    opponent: String
    status: String
    score: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    histories(player: String): [History]
  }

  input inputNewHistory {
    player: String!
    opponent: String!
    status: String!
    score: String!
  }
  type Mutation {
    addHistory(history: inputNewHistory): History
  }
`;

const resolvers = {
  Query: {
    histories: async (_, args) => {
      const param = args.player;
      const dataUser = await redis.get(`histories${param}`);
      if (dataUser) {
        return JSON.parse(dataUser);
      } else {
        const { data } = await axios.get(`${historiesUrl}/histories/${param}`);
        await redis.set(`histories${param}`, JSON.stringify(data));
        return data;
      }
    },
  },
  Mutation: {
    addHistory: async (_, args) => {
      const { player, opponent, status, score } = args.history;
      const newHistory = {
        player,
        opponent,
        status,
        score,
      };

      let { data } = await axios.post(`${historiesUrl}/histories`, newHistory);
      await redis.del(`histories${player}`);
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
