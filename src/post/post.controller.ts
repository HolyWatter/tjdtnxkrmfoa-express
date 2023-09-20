import { Router } from "express";
import Controller from "../interface/controller.interface";
import { Connection } from "mysql2";
import authMiddleware from "../middleware/authMiddleware";

class PostController implements Controller {
  public path = "/post";
  public router = Router();
  public db: Connection;

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.all(`${this.path}/*`, authMiddleware);
  }
}
