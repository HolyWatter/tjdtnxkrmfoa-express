import { Connection } from "mysql2";
import { CreatePostDto } from "./dto/createPost.dto";
import HttpException from "../exceptions/HttpException";
import postQueries from "./post.queries";

class PostService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async createPost({ title, content, categoryId, authorId }: CreatePostDto) {
    try {
      await this.db
        .promise()
        .execute(postQueries.createPost, [
          title,
          content,
          categoryId,
          authorId,
        ]);
    } catch (err) {
      throw new HttpException(500, "server Error!!");
    }
  }

  async deletePost(pid: string) {
    try {
      await this.db.promise().query(postQueries.deletePost, [pid]);
    } catch {
      throw new HttpException(500, "server Error!!");
    }
  }
}

export default PostService;
