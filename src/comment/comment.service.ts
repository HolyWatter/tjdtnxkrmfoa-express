import { Connection, RowDataPacket } from "mysql2";
import commentQueries from "./comment.queries";
import * as bcrypt from "bcrypt";
import HttpException from "../exceptions/HttpException";
import AuthorizedException from "../exceptions/AuthorizedException";
import OpenAI from "openai";

export class CommentService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async getCommentsByPid(pid: string) {
    const [comments] = await this.db
      .promise()
      .query(commentQueries.getCommentsByPid, [pid]);

    return {
      comments,
    };
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

  async createGptComment(pid: string) {
    const content = await this.db
      .promise()
      .query(commentQueries.getPostContent, pid);

    const openai = new OpenAI({
      apiKey: process.env.GPT_API_KEY,
    });

    const chatComplations = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "다음 글을 읽고 평가해줘 후기를 남겨도 좋고 잘못된 점이 있으면 지적해줘도 좋아",
        },
        {
          role: "user",
          content: content[0][0].content.replace(/<\/?[^>]+(>|$)/g, ""),
        },
      ],
      stream: false,
    });

    return await this.writeComment(
      pid,
      "GPT",
      process.env.GPT_PASSWORD,
      chatComplations.choices[0].message.content
    );
  }
}
