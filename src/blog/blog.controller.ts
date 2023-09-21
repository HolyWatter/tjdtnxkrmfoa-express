import { Response, Router } from "express";
import Controller from "../interface/controller.interface";
import { Connection } from "mysql2";
import BlogService from "./blog.service";
import App from "../app";
import authMiddleware from "../middleware/authMiddleware";
import RequestWithUser from "../interface/requestWithUser.interface";
import validationMiddleware from "../middleware/validation.middleware";
import UpdateBlogDto from "./dto/updateBlog.dto";

class BlogController implements Controller {
  public path = "/blog";
  public router = Router();
  private db: Connection;
  private blogService: BlogService;

  constructor() {
    const appInstance = App.getInstance([]);
    this.db = appInstance.getDB();
    this.blogService = new BlogService(this.db);
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .get(`${this.path}/:uid`)
      .delete(`${this.path}/:id`)
      .patch(`${this.path}/:uid`, validationMiddleware(UpdateBlogDto))
      .post(`${this.path}`, authMiddleware, this.createBlog);
  }

  private createBlog = async (req: RequestWithUser, res: Response) => {
    const user = req.user;
    await this.blogService.createBlog(user.id);

    res.status(200).json({
      message: "블로그가 생성되었습니다.",
    });
  };
}

export default BlogController;
