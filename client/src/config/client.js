import { gql, ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const GET_ROOMS = gql`
  query {
    rooms @client {
      nameRoom
      timer
      rangedScore
    }
  }
`;

export const roomsItem = makeVar([]);

const client = new ApolloClient({
  uri: "http://localhost:9003",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          rooms: {
            read: () => {
              return roomsItem;
            },
          },
        },
      },
    },
  }),
});

export default client;
