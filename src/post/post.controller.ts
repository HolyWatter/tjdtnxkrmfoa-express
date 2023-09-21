import { Response, Router } from "express";
import Controller from "../interface/controller.interface";
import { Connection } from "mysql2";
import authMiddleware from "../middleware/authMiddleware";
import App from "../app";
import PostService from "./post.service";
import RequestWithUser from "../interface/requestWithUser.interface";
import validationMiddleware from "../middleware/validation.middleware";
import { CreatePostBodyDto } from "./dto/createPost.dto";

class PostController implements Controller {
  public path = "/post";
  public router = Router();
  private db: Connection;
  private postService: PostService;

  constructor() {
    const appInstance = App.getInstance([]);
    this.db = appInstance.getDB();
    this.postService = new PostService(this.db);
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.get(`${this.path}/:uid`);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .delete(
        `${this.path}/:pid`,
        validationMiddleware(CreatePostBodyDto),
        this.deletePost
      )
      .patch(`${this.path}/:pid`, this.updatePost)
      .post(`${this.path}`, authMiddleware, this.createPost);
  }

  createPost = async (req: RequestWithUser, res: Response) => {
    const { id: authorId } = req.user;
    const { title, content, categoryId } = req.body;
    await this.postService.createPost({ title, content, categoryId, authorId });
    res.status(200).json({
      message: "게시글 작성에 성공했습니다.",
    });
  };

  updatePost = async (req: RequestWithUser, res: Response) => {};

  deletePost = async (req: RequestWithUser, res: Response) => {
    const { pid } = req.body;
    await this.postService.deletePost(pid);
    res.status(200).json({
      message: "게시글이 삭제되었습니다.",
    });
  };
}

export default PostController;
