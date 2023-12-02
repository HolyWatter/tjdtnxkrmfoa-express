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
const authMiddleware_1 = require("../middleware/authMiddleware");
const app_1 = require("../app");
const post_service_1 = require("./post.service");
const validation_middleware_1 = require("../middleware/validation.middleware");
const createPost_dto_1 = require("./dto/createPost.dto");
class PostController {
    constructor() {
        this.path = "/post";
        this.router = (0, express_1.Router)();
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id: authorId } = req.user;
            const { title, content, categoryId } = req.body;
            yield this.postService.createPost({ title, content, categoryId, authorId });
            res.status(200).json({
                message: "게시글 작성에 성공했습니다.",
            });
        });
        this.searchPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const { keyword } = req.query;
            console.log(uid, keyword);
            const result = yield this.postService.getSearchedPost(uid, keyword);
            res.status(200).json(result);
        });
        this.getPostByPid = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pid } = req.params;
            const result = yield this.postService.getPostByPid(pid);
            res.status(200).json(result);
        });
        this.getAllPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const result = yield this.postService.getUserAllPost(uid);
            res.status(200).json(result);
        });
        this.getCategoryPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid, cid } = req.params;
            const result = yield this.postService.getUserPostByCid(uid, cid);
            res.status(200).json(result);
        });
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pid } = req.body;
            yield this.postService.deletePost(pid);
            res.status(200).json({
                message: "게시글이 삭제되었습니다.",
            });
        });
        const appInstance = app_1.default.getInstance([]);
        this.db = appInstance.getDB();
        this.postService = new post_service_1.default(this.db);
        this.initalizeRoutes();
    }
    initalizeRoutes() {
        this.router.get(`${this.path}/search/:uid`, this.searchPost);
        this.router.get(`${this.path}/detail/:pid`, this.getPostByPid);
        this.router.get(`${this.path}/:uid`, this.getAllPost);
        this.router.get(`${this.path}/:uid/:cid`, this.getCategoryPost);
        this.router
            .all(`${this.path}/*`, authMiddleware_1.default)
            .delete(`${this.path}/:pid`, (0, validation_middleware_1.default)(createPost_dto_1.CreatePostBodyDto), this.deletePost)
            .patch(`${this.path}/:pid`, this.updatePost)
            .post(`${this.path}`, authMiddleware_1.default, this.createPost);
    }
}
exports.default = PostController;
//# sourceMappingURL=post.controller.js.map