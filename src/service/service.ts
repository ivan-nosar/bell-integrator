import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";

import { logger } from "../logger";
import { DatabaseManager } from "./database/database-manager";
import { GraphQLSchema } from "graphql";
import { configuration } from "../configuration";
import { AuthorResolver } from "./graphql/resolvers/author-resolver";
import { BookResolver } from "./graphql/resolvers/book-resolver";

export class Service {

    private databaseManager: DatabaseManager;
    private server: ApolloServer;

    constructor() {

        // Build GraphQL schema and construct server
        buildSchema({
            resolvers: [AuthorResolver, BookResolver],
            emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        })
            .then((schema: GraphQLSchema) => {
                this.server = new ApolloServer({
                    schema,
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
            logger.log(`Server is running, GraphQL Playground available at ${url}`);
        } catch (error) {
            logger.error("An unexpected error occurred when the server starts");
            logger.error(error);
        }
    }
}
