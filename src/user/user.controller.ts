import { Response, Router } from "express";
import Controller from "../interface/controller.interface";
import UserService from "./user.service";
import App from "../app";
import authMiddleware from "../middleware/authMiddleware";
import RequestWithUser from "../interface/requestWithUser.interface";
import currentUserMiddleware from "../middleware/currentUserMiddleware";

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
    this.router.get(this.path, currentUserMiddleware, this.currentUser);
    this.router.post(this.path, this.userService.createUser);
  }

  private currentUser = async (req: RequestWithUser, res: Response) => {
    if (req.user == null) return res.json(null);

    const uid = req.user.id;
    const user = await this.userService.currentUser(uid);

    return res.json(user);
  };
}

export default UserController;
