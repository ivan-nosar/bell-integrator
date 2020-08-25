import "reflect-metadata"; // Requirement of typegraphql package
import { Service } from "./service/service";

const service: Service = new Service();
service.start();
