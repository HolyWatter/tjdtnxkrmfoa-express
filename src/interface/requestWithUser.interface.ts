import { Request } from "express";

interface RequestWithUser extends Request {
  user: {
    id: number;
    name: string;
    email: string;
    nickname: string;
  };
}

export default RequestWithUser;
