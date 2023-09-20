import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import RequestWithUser from "../interface/requestWithUser.interface";
import App from "../app";
import userQueries from "../user/user.queries";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationExecption";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const appInstance = App.getInstance([]);
  const db = appInstance.getDB();

  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataInToken;
      const email = verificationResponse.email;
      const [row] = await db
        .promise()
        .query(userQueries.getUserByEmail, [email]);

      if (row[0]) {
        req.user = row[0];
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch {
      new WrongAuthenticationTokenException();
    }
  } else {
    new WrongAuthenticationTokenException();
  }
};

export default authMiddleware;
