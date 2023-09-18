import { Request } from "express";
import { Connection } from "mysql2/promise";

declare module "express" {
  interface Request {
    db: Connection;
  }
}
