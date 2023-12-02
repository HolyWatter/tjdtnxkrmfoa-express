import { Request, Response } from "express";
import Controller from "../interface/controller.interface";
export declare class CommentsController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    private db;
    private commentService;
    constructor();
    private initializeRoutes;
    writeComment: (req: Request, res: Response) => Promise<void>;
    deleteComment: (req: Request, res: Response) => Promise<void>;
}
