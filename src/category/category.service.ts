import { Connection, ConnectionConfig } from "mysql2";
import categoryQueries from "./category.queries";
import HttpException from "../exceptions/HttpException";

class CategoryService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  async getUserCategory(uid: string) {
    try {
      const [rows] = await this.db
        .promise()
        .query(categoryQueries.getUserCategory, [uid]);

      return rows;
    } catch {
      throw new HttpException(500, "server Error");
    }
  }

  async createCategory(categoryName: string, userId: number) {
    try {
      await this.db
        .promise()
        .execute(categoryQueries.createCategory, [categoryName, userId]);
    } catch (err) {
      throw new HttpException(500, "server Error");
    }
  }
  async deleteCategory(cid: string) {
    try {
      await this.db.promise().query(categoryQueries.deleteCategory, [cid]);
    } catch {
      throw new HttpException(500, "server Error");
    }
  }

  async updateCategory(categoryName: string, cid: string) {
    try {
      await this.db
        .promise()
        .query(categoryQueries.updateCategory, [categoryName, cid]);
    } catch {
      throw new HttpException(500, "server Error");
    }
  }
}

export default CategoryService;
