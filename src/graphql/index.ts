import { ApolloClient, InMemoryCache } from "@apollo/client";


export const graphqlClient = new ApolloClient({
  uri: "http://localhost:8000",
  cache: new InMemoryCache(),
});

export * from "./query"