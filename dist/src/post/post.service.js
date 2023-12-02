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
const HttpException_1 = require("../exceptions/HttpException");
const post_queries_1 = require("./post.queries");
const category_queries_1 = require("../category/category.queries");
class PostService {
    constructor(db) {
        this.db = db;
    }
    getSearchedPost(uid, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const [posts] = yield this.db
                .promise()
                .query(post_queries_1.default.searchPost, [`%${keyword}%`, `%${keyword}%`, uid]);
            const [count] = yield this.db
                .promise()
                .query(post_queries_1.default.countSearchPost, [
                `%${keyword}%`,
                `%${keyword}%`,
                uid,
            ]);
            return {
                postCount: count[0].count,
                posts,
            };
        });
    }
    getPostByPid(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const [post] = yield this.db
                .promise()
                .query(post_queries_1.default.getPostByPid, [pid]);
            return post[0];
        });
    }
    getUserAllPost(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield this.db
                    .promise()
                    .query(post_queries_1.default.getPostAll, [uid]);
                const [count] = yield this.db
                    .promise()
                    .query(post_queries_1.default.getPostCount, [uid]);
                return Object.assign(Object.assign({}, count[0]), { posts: rows });
            }
            catch (e) {
                console.log(e);
                throw new HttpException_1.default(500, "server Error!!");
            }
        });
    }
    getUserPostByCid(uid, cid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [posts] = yield this.db
                    .promise()
                    .query(post_queries_1.default.getPostByCategory, [uid, cid]);
                const [count] = yield this.db
                    .promise()
                    .query(post_queries_1.default.getPostCountByCategory, [uid, cid]);
                const [category] = yield this.db
                    .promise()
                    .query(category_queries_1.default.getCategoryInfoByCid, [uid, cid]);
                console.log();
                return Object.assign(Object.assign({ category: category[0] }, count[0]), { posts });
            }
            catch (_a) { }
        });
    }
    createPost({ title, content, categoryId, authorId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .promise()
                    .execute(post_queries_1.default.createPost, [
                    title,
                    content,
                    categoryId,
                    authorId,
                ]);
            }
            catch (err) {
                console.log(err);
                throw new HttpException_1.default(500, "server Error!!");
            }
        });
    }
    deletePost(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.promise().query(post_queries_1.default.deletePost, [pid]);
            }
            catch (_a) {
                throw new HttpException_1.default(500, "server Error!!");
            }
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=post.service.js.map