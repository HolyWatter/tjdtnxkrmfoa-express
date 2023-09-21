import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interface/controller.interface";
import { Connection } from "mysql2";
import CategoryService from "./category.service";
import App from "../app";
import authMiddleware from "../middleware/authMiddleware";
import RequestWithUser from "../interface/requestWithUser.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateCategoryDto from "./dto/createCategory.dto";

class CategoryController implements Controller {
  public path = "/category";
  public router = Router();
  public categoryService: CategoryService;
  private db: Connection;

  constructor() {
    const appInstance = App.getInstance([]);
    this.db = appInstance.getDB();
    this.categoryService = new CategoryService(this.db);
    this.initailizeRouter();
  }

  private initailizeRouter() {
    this.router.get(`${this.path}/:uid`, this.getUserCategory);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(
        `${this.path}/:cid`,
        validationMiddleware(CreateCategoryDto),
        this.updateCategory
      )
      .delete(`${this.path}/:cid`, this.deleteCategory)
      .post(
        `${this.path}`,
        authMiddleware,
        validationMiddleware(CreateCategoryDto),
        this.createCategory
      );
  }

  private getUserCategory = async (req: Request, res: Response) => {
    const userId = req.params.uid;

    console.log(userId);

    const categories = await this.categoryService.getUserCategory(userId);

    res.status(200).json({
      categories,
    });
  };

  private createCategory = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    const { categoryName } = req.body;
    await this.categoryService.createCategory(categoryName, user.id);
    res.status(200).json({
      message: "카테고리가 생성되었습니다.",
    });
  };

  private deleteCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.cid;
    await this.categoryService.deleteCategory(categoryId);
    res.status(200).json();
  };

  private updateCategory = async (req: Request, res: Response) => {
    const categoryId = req.params.cid;
    const { categoryName } = req.body;

    await this.categoryService.updateCategory(categoryName, categoryId);
    res.status(200).json({
      message: "카테고리를 수정했습니다.",
    });
  };
}

export default CategoryController;
