import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { readFileSync } from "fs";

import dogs from "./dogs.json" assert { type: "json" };

const typeDefs = gql(
  readFileSync("./schema.graphql", "UTF-8")
);

const resolvers = {
  Query: {
    allDogs: () => dogs,
    dogCount: () => dogs.length
  }
};

const PORT = process.env.PORT || 4002;

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers
    })
  });
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT
    }
  });
  console.log(`Service running at ${url}`);
}

startApolloServer();
