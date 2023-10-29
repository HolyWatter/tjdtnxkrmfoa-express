import { Response, Router } from "express";
import Controller from "../interface/controller.interface";
import UserService from "./user.service";
import App from "../app";
import authMiddleware from "../middleware/authMiddleware";
import RequestWithUser from "../interface/requestWithUser.interface";

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
    this.router.get(this.path, authMiddleware, this.currentUser);
    this.router.post(this.path, this.userService.createUser);
  }

  private currentUser = async (req: RequestWithUser, res: Response) => {
    const uid = req.user.id;
    const user = await this.userService.currentUser(uid);

    res.json(user);
  };
}

export default UserController;
