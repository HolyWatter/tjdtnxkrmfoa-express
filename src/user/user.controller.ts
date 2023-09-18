import { Router } from "express";
import Controller from "../interface/controller.interface";
import UserService from "./user.service";
import App from "../app";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  public userService: UserService;

  constructor() {
    const appInstance = App.getInstance([]);
    const db = appInstance.getDB();
    this.userService = new UserService(db);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.userService.returnOne);
    this.router.post(this.path, this.userService.createUser);
  }
}

export default UserController;
