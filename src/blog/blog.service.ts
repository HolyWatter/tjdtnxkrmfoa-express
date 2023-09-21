import { Connection, RowDataPacket } from "mysql2";
import blogQueries from "./blog.queries";
import HttpException from "../exceptions/HttpException";
import UpdateBlogDto from "./dto/updateBlog.dto";

class BlogService {
  private db: Connection;
  constructor(db: Connection) {
    this.db = db;
  }

  async getBlogInfo(id: string) {}

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
  }: UpdateBlogDto) {}
}

export default BlogService;
