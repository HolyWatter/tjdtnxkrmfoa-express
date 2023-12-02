import { NextFunction, Response } from "express";
import RequestWithUser from "../interface/requestWithUser.interface";
declare const authMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
