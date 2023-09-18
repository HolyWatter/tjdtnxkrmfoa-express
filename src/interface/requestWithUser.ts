import { Request } from "express";

interface RequestWithUser extends Request {
  user: {
    name: string;
    email: string;
    nickname: string;
    password: string;
  };
}
