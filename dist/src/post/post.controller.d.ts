import { Response } from "express";
import Controller from "../interface/controller.interface";
import RequestWithUser from "../interface/requestWithUser.interface";
declare class PostController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    private db;
    private postService;
    constructor();
    private initalizeRoutes;
    createPost: (req: RequestWithUser, res: Response) => Promise<void>;
    searchPost: (req: RequestWithUser, res: Response) => Promise<void>;
    getPostByPid: (req: RequestWithUser, res: Response) => Promise<void>;
    getAllPost: (req: RequestWithUser, res: Response) => Promise<void>;
    getCategoryPost: (req: RequestWithUser, res: Response) => Promise<void>;
    updatePost: (req: RequestWithUser, res: Response) => Promise<void>;
    deletePost: (req: RequestWithUser, res: Response) => Promise<void>;
}
export default PostController;
