import { Connection, RowDataPacket } from "mysql2";
import commentQueries from "./comment.queries";
import * as bcrypt from "bcrypt";
import HttpException from "../exceptions/HttpException";
import AuthorizedException from "../exceptions/AuthorizedException";

export class CommentService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async writeComment(
    pid: string,
    username: string,
    password: string,
    comment: string
  ) {
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      await this.db
        .promise()
        .execute(commentQueries.writeComment, [
          pid,
          username,
          hashPassword,
          comment,
        ]);
    } catch (e) {
      throw new HttpException(500, "server Error!!");
    }
  }

  async deleteComment(id: string, password: string) {
    try {
      const [comment] = (await this.db
        .promise()
        .query(commentQueries.getOneCommentWithPassword, [
          id,
        ])) as RowDataPacket[];

      const isValidPassword = await bcrypt.compare(
        password,
        comment[0].password
      );

      if (!isValidPassword) throw new AuthorizedException();

      await this.db.promise().query(commentQueries.deleteComment, [id]);
    } catch (e) {
      throw new HttpException(500, "server Error!!");
    }
  }
}
