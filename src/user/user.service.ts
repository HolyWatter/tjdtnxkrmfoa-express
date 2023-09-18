import { Request, Response } from "express";
import { Connection } from "mysql2";

class UserService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
    console.log(db);
  }

  createUser = (req: Request, res: Response) => {
    try {
      this.db.execute(
        "INSERT INTO user (name, nickname, email, password) VALUES (?, ?, ?, ?)",
        ["name", "nickname", "email", "password"]
      );
      return res.json({
        message: "success",
      });
    } catch {
      throw new Error("failed");
    }
  };

  async returnOne(req: Request, res: Response) {
    return res.json({
      data: 1,
    });
  }
}

export default UserService;
