import Controller from "../interface/controller.interface";
import CategoryService from "./category.service";
declare class CategoryController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    categoryService: CategoryService;
    private db;
    constructor();
    private initailizeRouter;
    private getUserCategory;
    private createCategory;
    private deleteCategory;
    private updateCategory;
}
export default CategoryController;
