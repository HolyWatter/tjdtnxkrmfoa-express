import { Request, Response } from "express";
import { Connection } from "mysql2";
import userQueries from "./user.queries";

class UserService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  createUser = (req: Request, res: Response) => {
    // try {
    //   this.db.execute(
    //     "INSERT INTO user (name, nickname, email, password) VALUES (?, ?, ?, ?)",
    //     ["name", "nickname", "email", "password"]
    //   );
    //   return res.json({
    //     message: "success",
    //   });
    // } catch {
    //   throw new Error("failed");
    // }
  };

  async currentUser(uid?: number) {
    const [rows] = await this.db
      .promise()
      .query(userQueries.getUserByUidWithoutPassword, [uid]);

    return rows;
  }
}

export default UserService;
