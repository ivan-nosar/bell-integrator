class Configuration {
    public readonly serverPort: number;
    public readonly databaseName: string;
    public readonly databaseHost: string;
    public readonly databasePort: number;
    public readonly databaseUser: string;
    public readonly databasePassword: string;

    constructor() {
        this.serverPort = Number(process.env.SERVER_PORT);
        this.databaseName = String(process.env.DATABASE_NAME);
        this.databaseHost = String(process.env.DATABASE_HOST);
        this.databasePort = Number(process.env.DATABASE_PORT);
        this.databaseUser = String(process.env.DATABASE_USER);
        this.databasePassword = String(process.env.DATABASE_PASSWORD);
    }
}

// ToDo: Load config with port, FFs and etc.
export const configuration = new Configuration();
