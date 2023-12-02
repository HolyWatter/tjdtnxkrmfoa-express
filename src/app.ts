import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as mysql from "mysql2";
import * as cors from "cors";
import Controller from "./interface/controller.interface";

class App {
  public app: express.Application;
  private db: mysql.Connection | undefined;
  private static instance: App;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connetToDB();
  }

  public listen() {
    this.app.listen(8000, () => {
      console.log("This App is Running on http://localhost:8000");
    });
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => this.app.use("/", controller.router));
  }

  private connetToDB() {
    const { DB_HOST, DB_USER, DB_PW, DB_NAME } = process.env;

    console.log(DB_HOST, DB_USER);
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

  public getDB(): mysql.Connection {
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
