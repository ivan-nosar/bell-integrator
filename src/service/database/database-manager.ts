import { createConnection, Connection } from "typeorm";
import { Author } from "../entities/author";
import { Book } from "../entities/book";
import { configuration } from "../../configuration";

export class DatabaseManager {
    private _connection?: Connection;

    public async connect() {
        const entities = [
            Author,
            Book
        ];

        this._connection = await createConnection({
            type: "mysql",
            host: configuration.databaseHost,
            port: configuration.databasePort,
            username: configuration.databaseUser,
            password: configuration.databasePassword,
            database: configuration.databaseName,
            entities,
            synchronize: true,
            logging: false
        });
    }

    public get connection(): Connection {
        if (!this._connection) {
            throw new Error("Connection to database is not initiated");
        }
        return this._connection;
    }
}
