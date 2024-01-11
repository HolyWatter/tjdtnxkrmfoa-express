import { Request, Response, Router } from "express";
import Controller from "../interface/controller.interface";
import { Connection } from "mysql2";
import App from "../app";
import { CommentService } from "./comment.service";

export class CommentsController implements Controller {
  public path = "/comment";
  public router = Router();
  private db: Connection;
  private commentService: CommentService;

  constructor() {
    const appInstance = App.getInstance([]);
    this.db = appInstance.getDB();
    this.commentService = new CommentService(this.db);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:pid`, this.getCommentsByPid);
    this.router.post(`${this.path}/:pid`, this.writeComment);
    this.router.delete(`${this.path}/:id`, this.deleteComment);
  }

  getCommentsByPid = async (req: Request, res: Response) => {
    const { pid } = req.params;

    const comments = await this.commentService.getCommentsByPid(pid);

    return res.status(200).json(comments);
  };

  writeComment = async (req: Request, res: Response) => {
    const { username, password, comment } = req.body;
    const { pid } = req.params;

    await this.commentService.writeComment(pid, username, password, comment);

    res.status(200).json({ message: "댓글이 작성되었습니다." });
  };

  deleteComment = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.params;
    await this.commentService.deleteComment(id, password);

    res.status(204).json({
      message: "댓글이 삭제되었습니다.",
    });
  };

  //   updateComment = async (req: Request, res: Response) => {};
}
