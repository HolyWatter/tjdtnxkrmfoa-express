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
exports.CommentsController = void 0;
const express_1 = require("express");
const app_1 = require("../app");
const comment_service_1 = require("./comment.service");
class CommentsController {
    constructor() {
        this.path = "/comment";
        this.router = (0, express_1.Router)();
        this.writeComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password, comment } = req.body;
            const { pid } = req.params;
            yield this.commentService.writeComment(pid, username, password, comment);
            res.status(200).json({ message: "댓글이 작성되었습니다." });
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            const { id } = req.params;
            yield this.commentService.deleteComment(id, password);
            res.status(204).json({
                message: "댓글이 삭제되었습니다.",
            });
        });
        const appInstance = app_1.default.getInstance([]);
        this.db = appInstance.getDB();
        this.commentService = new comment_service_1.CommentService(this.db);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/:pid`, this.writeComment);
        this.router.delete(`${this.path}/:id`, this.deleteComment);
    }
}
exports.CommentsController = CommentsController;
//# sourceMappingURL=comment.controller.js.map