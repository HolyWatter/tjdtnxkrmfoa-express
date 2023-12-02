"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");
const cors = require("cors");
class App {
    constructor(controllers) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connetToDB();
    }
    listen() {
        this.app.listen(8000, () => {
            console.log("This App is Running on http://localhost:8000");
        });
    }
    initializeMiddlewares() {
        this.app.use(cors({
            origin: true,
            credentials: true,
        }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => this.app.use("/", controller.router));
    }
    connetToDB() {
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
    getDB() {
        if (!App.instance) {
            throw new Error("인스턴스 아직 생성되지 않음");
        }
        if (!App.instance.db) {
            throw new Error("DB connection has not been established yet.");
        }
        return App.instance.db;
    }
    static getInstance(controllers) {
        if (!App.instance) {
            App.instance = new App(controllers);
        }
        return App.instance;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map