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
    this.router.get(`${this.path}/home/:uid`, this.getHomeData);
    this.router.get(`${this.path}/search/:uid`, this.searchPost);
    this.router.get(`${this.path}/detail/:pid`, this.getPostByPid);
    this.router.get(`${this.path}/:uid`, this.getAllPost);
    this.router.get(`${this.path}/:uid/:cid`, this.getCategoryPost);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .delete(`${this.path}/:pid`, this.deletePost)
      .patch(`${this.path}/:pid`, this.updatePost)
      .post(`${this.path}`, authMiddleware, this.createPost);
  }

  getHomeData = async (req: RequestWithUser, res: Response) => {
    const { uid } = req.params;
    const data = await this.postService.getHomeData(uid);

    return res.status(200).json(data);
  };

  createPost = async (req: RequestWithUser, res: Response) => {
    const { id: authorId } = req.user;
    const { title, content, categoryId, isPinned, thumbnailUrl } = req.body;
    await this.postService.createPost({
      title,
      content,
      categoryId,
      authorId,
      isPinned,
      thumbnailUrl,
    });
    res.status(200).json({
      message: "게시글 작성에 성공했습니다.",
    });
  };

  searchPost = async (req: RequestWithUser, res: Response) => {
    const { uid } = req.params;
    const { keyword } = req.query;

    const result = await this.postService.getSearchedPost(
      uid,
      keyword as string
    );

    res.status(200).json(result);
  };

  getPostByPid = async (req: RequestWithUser, res: Response) => {
    const { pid } = req.params;

    const result = await this.postService.getPostByPid(pid);

    res.status(200).json(result);
  };

  getAllPost = async (req: RequestWithUser, res: Response) => {
    const { uid } = req.params;
    const result = await this.postService.getUserAllPost(uid);

    res.status(200).json(result);
  };

  getCategoryPost = async (req: RequestWithUser, res: Response) => {
    const { uid, cid } = req.params;
    const result = await this.postService.getUserPostByCid(uid, cid);

    return res.status(200).json(result);
  };

  updatePost = async (req: RequestWithUser, res: Response) => {
    const { pid } = req.params;
    const { title, content, categoryId, isPinned, thumbnailUrl } = req.body;

    await this.postService.updatePost({
      title,
      content,
      categoryId,
      pid,
      isPinned,
      thumbnailUrl,
    });
    return res.status(200).json({
      message: "게시글이 수정되었습니다.",
    });
  };

  deletePost = async (req: RequestWithUser, res: Response) => {
    const { pid } = req.params;
    await this.postService.deletePost(pid);
    return res.status(200).json({
      message: "게시글이 삭제되었습니다.",
    });
  };
}

export default PostController;
