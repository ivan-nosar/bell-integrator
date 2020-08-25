import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";

import { logger } from "../logger";
import { RecipeResolver } from "./graphql/resolvers/recipe-resolver";
import { DatabaseManager } from "./database/database-manager";
import { GraphQLSchema } from "graphql";
import { configuration } from "../configuration";

export class Service {

    private databaseManager: DatabaseManager;
    private server: ApolloServer;

    constructor() {

        // Build GraphQL schema and construct server
        buildSchema({
            resolvers: [RecipeResolver],
            emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        })
            .then((schema: GraphQLSchema) => {
                this.server = new ApolloServer({
                    schema,
                    // enable GraphQL Playground
                    playground: true,
                });
            })
            .catch((error: Error) => {
                logger.error("An unexpected error occurred during building the server schema");
                logger.error(error);
                throw error;
            });

        // Construct database manager
        this.databaseManager = new DatabaseManager();
    }

    public async start() {
        try {
            await this.databaseManager.connect();
            const { url } = await this.server.listen(configuration.serverPort);
            console.log(`Server is running, GraphQL Playground available at ${url}`);
        } catch (error) {
            logger.error("An unexpected error occurred when the server starts");
            logger.error(error);
        }
    }
}
