import { Connection, RowDataPacket } from "mysql2";
import blogQueries from "./blog.queries";
import HttpException from "../exceptions/HttpException";
import { UpdateBlogDtoWithId } from "./dto/updateBlog.dto";
import userQueries from "../user/user.queries";

class BlogService {
  private db: Connection;
  constructor(db: Connection) {
    this.db = db;
  }

  async getBlogInfo(id: string) {
    const [rows] = await this.db
      .promise()
      .query(blogQueries.findUserBlogInfo, [id]);

    return rows[0];
  }

  createBlog = async (uid: number) => {
    const [rows] = (await this.db
      .promise()
      .query(blogQueries.findUserBlogInfo, [uid])) as RowDataPacket[];

    if (rows.length) throw new HttpException(400, "이미 존재합니다.");
    try {
      const result = await this.db
        .promise()
        .execute(blogQueries.createBlog, [uid]);
    } catch (err) {
      throw new HttpException(500, "server Error");
    }
  };

  async deleteBlog(id: string) {}

  async updateBlogInfo({
    blogName,
    description,
    thumbnailUrl,
    blogId,
    nickname,
  }: UpdateBlogDtoWithId) {
    try {
      const result1 = await this.db
        .promise()
        .query(blogQueries.updateBlogInfo, [
          blogName,
          description,
          thumbnailUrl,
          blogId,
        ]);
      const result2 = await this.db
        .promise()
        .query(userQueries.updateUserNickname, [nickname, blogId]);
    } catch (err) {
      throw new HttpException(500, "server Error");
    }
  }
}

export default BlogService;
