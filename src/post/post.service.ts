import { Connection, RowDataPacket } from "mysql2";
import { CreatePostDto } from "./dto/createPost.dto";
import HttpException from "../exceptions/HttpException";
import postQueries from "./post.queries";
import categoryQueries from "../category/category.queries";

class PostService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async getHomeData(uid: string) {
    const [pinnedPost] = await this.db
      .promise()
      .query(postQueries.pinnedPost, [uid]);
    const [lastPost] = await this.db
      .promise()
      .query(postQueries.lastPost, [uid]);

    return {
      pinnedPost,
      lastPost,
    };
  }

  async getSearchedPost(uid: string, keyword: string) {
    const [posts] = await this.db
      .promise()
      .query(postQueries.searchPost, [`%${keyword}%`, `%${keyword}%`, uid]);

    const [count] = await this.db
      .promise()
      .query(postQueries.countSearchPost, [
        `%${keyword}%`,
        `%${keyword}%`,
        uid,
      ]);

    return {
      postCount: count[0].count,
      posts,
    };
  }

  async getPostByPid(pid: string) {
    const [post] = await this.db
      .promise()
      .query(postQueries.getPostByPid, [pid]);

    return post[0];
  }

  async getUserAllPost(uid: string) {
    try {
      const [rows] = await this.db
        .promise()
        .query(postQueries.getPostAll, [uid]);

      const [count] = await this.db
        .promise()
        .query(postQueries.getPostCount, [uid]);

      return {
        ...count[0],
        posts: rows,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(500, "server Error!!");
    }
  }

  async getUserPostByCid(uid: string, cid: string) {
    try {
      const [posts] = await this.db
        .promise()
        .query(postQueries.getPostByCategory, [uid, cid]);

      const [count] = await this.db
        .promise()
        .query(postQueries.getPostCountByCategory, [uid, cid]);

      const [category] = await this.db
        .promise()
        .query(categoryQueries.getCategoryInfoByCid, [uid, cid]);

      return {
        category: category[0],
        ...count[0],
        posts,
      };
    } catch {}
  }

  async createPost({
    title,
    content,
    categoryId,
    authorId,
    isPinned,
    thumbnailUrl,
  }: CreatePostDto) {
    try {
      const [result] = (await this.db
        .promise()
        .execute(postQueries.createPost, [
          title,
          content,
          categoryId,
          authorId,
          isPinned,
          thumbnailUrl,
        ])) as RowDataPacket[];

      return result.insertId;
    } catch (err) {
      console.log(err);
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

  async updatePost({
    title,
    content,
    categoryId,
    pid,
    isPinned,
    thumbnailUrl,
  }) {
    try {
      const result = await this.db
        .promise()
        .query(postQueries.updatePostByPid, [
          title,
          content,
          categoryId,
          isPinned,
          thumbnailUrl,
          pid,
        ]);
    } catch (error) {
      console.log(error);
      throw new HttpException(500, error.toString());
    }
  }
}

export default PostService;
