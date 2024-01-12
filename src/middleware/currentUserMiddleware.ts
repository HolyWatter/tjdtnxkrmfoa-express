import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import RequestWithUser from "../interface/requestWithUser.interface";
import App from "../app";
import userQueries from "../user/user.queries";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationExecption";
import DataInToken from "../interface/dataInToken.interface";

const currentUserMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  const appInstance = App.getInstance([]);
  const db = appInstance.getDB();
  if (token) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(token, secret) as DataInToken;
      const email = verificationResponse.email;
      const [row] = await db
        .promise()
        .query(userQueries.getUserByEmail, [email]);

      if (row[0]) {
        req.user = row[0];
        next();
      } else {
        req.user = null;
      }
    } catch {
      req.user = null;
    }
  } else {
    req.user = null;
    next();
  }
};

export default currentUserMiddleware;
