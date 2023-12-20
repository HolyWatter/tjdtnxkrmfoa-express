import { Request, Response, Router } from "express";
import Controller from "./interface/controller.interface";

class AppController implements Controller {
  public path = "/";
  public router = Router();

  constructor() {
    this.router.get("/", (req: Request, res: Response) => {
      res.json("ok");
    });
  }
}

export default AppController;
