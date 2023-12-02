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
const blog_service_1 = require("./blog.service");
const app_1 = require("../app");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const updateBlog_dto_1 = require("./dto/updateBlog.dto");
class BlogController {
    constructor() {
        this.path = "/blog";
        this.router = (0, express_1.Router)();
        this.getUserBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const blogInfo = yield this.blogService.getBlogInfo(uid);
            return res.status(200).json(blogInfo);
        });
        this.createBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            yield this.blogService.createBlog(user.id);
            res.status(200).json({
                message: "블로그가 생성되었습니다.",
            });
        });
        this.updateBlogInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const blogInfo = req.body;
            yield this.blogService.updateBlogInfo(Object.assign(Object.assign({}, blogInfo), { blogId: uid }));
            res.status(200).json({
                message: "정보가 수정되었습니다.",
            });
        });
        const appInstance = app_1.default.getInstance([]);
        this.db = appInstance.getDB();
        this.blogService = new blog_service_1.default(this.db);
        this.initializeRoute();
    }
    initializeRoute() {
        this.router
            .get(`${this.path}/:uid`, this.getUserBlog)
            .all(`${this.path}/*`, authMiddleware_1.default)
            .delete(`${this.path}/:id`)
            .patch(`${this.path}/:uid`, (0, validation_middleware_1.default)(updateBlog_dto_1.UpdateBlogDto), this.updateBlogInfo)
            .post(`${this.path}`, authMiddleware_1.default, this.createBlog);
    }
}
exports.default = BlogController;
//# sourceMappingURL=blog.controller.js.map