import { logger } from "../logger";

export class Service {

    constructor() {
        logger.log("Constructing service...");
    }

    public async start() {
        logger.log("Starting service...!!!");
    }
}
