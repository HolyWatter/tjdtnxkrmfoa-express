import * as express from "express";
import * as mysql from "mysql2";
import Controller from "./interface/controller.interface";
declare class App {
    app: express.Application;
    private db;
    private static instance;
    constructor(controllers: Controller[]);
    listen(): void;
    private initializeMiddlewares;
    private initializeControllers;
    private connetToDB;
    getDB(): mysql.Connection;
    static getInstance(controllers: Controller[]): App;
}
export default App;
