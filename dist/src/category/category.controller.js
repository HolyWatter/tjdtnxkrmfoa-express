"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_service_1 = require("./category.service");
const app_1 = require("../app");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const createCategory_dto_1 = require("./dto/createCategory.dto");
class CategoryController {
    constructor() {
        this.path = "/category";
        this.router = (0, express_1.Router)();
        this.getUserCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.uid;
            const categories = yield this.categoryService.getUserCategory(userId);
            res.status(200).json(categories);
        });
        this.createCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { categoryName } = req.body;
            yield this.categoryService.createCategory(categoryName, user.id);
            res.status(200).json({
                message: "카테고리가 생성되었습니다.",
            });
        });
        this.deleteCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const categoryId = req.params.cid;
            yield this.categoryService.deleteCategory(categoryId);
            res.status(200).json({
                message: "카테고리가 삭제되었습니다.",
            });
        });
        this.updateCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const categoryId = req.params.cid;
            const { categoryName } = req.body;
            yield this.categoryService.updateCategory(categoryName, categoryId);
            res.status(200).json({
                message: "카테고리를 수정했습니다.",
            });
        });
        const appInstance = app_1.default.getInstance([]);
        this.db = appInstance.getDB();
        this.categoryService = new category_service_1.default(this.db);
        this.initailizeRouter();
    }
    initailizeRouter() {
        this.router.get(`${this.path}/:uid`, this.getUserCategory);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .patch(`${this.path}/:cid`, (0, validation_middleware_1.default)(createCategory_dto_1.default), this.updateCategory)
            .delete(`${this.path}/:cid`, this.deleteCategory)
            .post(`${this.path}`, authMiddleware_1.default, (0, validation_middleware_1.default)(createCategory_dto_1.default), this.createCategory);
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map