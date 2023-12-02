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
const blog_queries_1 = require("./blog.queries");
const HttpException_1 = require("../exceptions/HttpException");
const user_queries_1 = require("../user/user.queries");
class BlogService {
    constructor(db) {
        this.createBlog = (uid) => __awaiter(this, void 0, void 0, function* () {
            const [rows] = (yield this.db
                .promise()
                .query(blog_queries_1.default.findUserBlogInfo, [uid]));
            if (rows.length)
                throw new HttpException_1.default(400, "이미 존재합니다.");
            try {
                const result = yield this.db
                    .promise()
                    .execute(blog_queries_1.default.createBlog, [uid]);
            }
            catch (err) {
                throw new HttpException_1.default(500, "server Error");
            }
        });
        this.db = db;
    }
    getBlogInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.db
                .promise()
                .query(blog_queries_1.default.findUserBlogInfo, [id]);
            return rows[0];
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateBlogInfo({ blogName, description, thumbnailUrl, blogId, nickname, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result1 = yield this.db
                    .promise()
                    .query(blog_queries_1.default.updateBlogInfo, [
                    blogName,
                    description,
                    thumbnailUrl,
                    blogId,
                ]);
                const result2 = yield this.db
                    .promise()
                    .query(user_queries_1.default.updateUserNickname, [nickname, blogId]);
            }
            catch (err) {
                console.log(err);
                throw new HttpException_1.default(500, "server Error");
            }
        });
    }
}
exports.default = BlogService;
//# sourceMappingURL=blog.service.js.map