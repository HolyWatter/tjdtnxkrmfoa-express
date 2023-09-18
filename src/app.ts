import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Controller from "./interface/controller.interface";
import mysql from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

class App {
  public app: express.Application;
  private db: Connection | undefined;

  private static instance: App;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeControllers(controllers);
    this.initializeMiddlewares();
    this.connetToDB();
  }

  public listen() {
    this.app.listen(8000, () => {
      console.log("This App is Running on http://localhost:8000");
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => this.app.use("/", controller.router));
  }

  private connetToDB() {
    const { DB_HOST, DB_USER, DB_PW, DB_NAME } = process.env;

    this.db = mysql.createConnection({
      host: DB_HOST,
      port: 3306,
      user: DB_USER,
      password: DB_PW,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  public getDB(): Connection {
    if (!App.instance) {
      throw new Error("인스턴스 아직 생성되지 않음");
    }
    if (!App.instance.db) {
      throw new Error("DB connection has not been established yet.");
    }
    return App.instance.db;
  }

  public static getInstance(controllers: Controller[]): App {
    if (!App.instance) {
      App.instance = new App(controllers);
    }
    return App.instance;
  }
}

export default App;
