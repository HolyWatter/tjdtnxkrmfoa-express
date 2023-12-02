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
exports.CommentService = void 0;
const comment_queries_1 = require("./comment.queries");
const bcrypt = require("bcrypt");
const HttpException_1 = require("../exceptions/HttpException");
const AuthorizedException_1 = require("../exceptions/AuthorizedException");
class CommentService {
    constructor(db) {
        this.db = db;
    }
    writeComment(pid, username, password, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt.hash(password, 10);
            try {
                yield this.db
                    .promise()
                    .execute(comment_queries_1.default.writeComment, [
                    pid,
                    username,
                    hashPassword,
                    comment,
                ]);
            }
            catch (e) {
                throw new HttpException_1.default(500, "server Error!!");
            }
        });
    }
    deleteComment(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [comment] = (yield this.db
                    .promise()
                    .query(comment_queries_1.default.getOneCommentWithPassword, [
                    id,
                ]));
                const isValidPassword = yield bcrypt.compare(password, comment[0].password);
                if (!isValidPassword)
                    throw new AuthorizedException_1.default();
                yield this.db.promise().query(comment_queries_1.default.deleteComment, [id]);
            }
            catch (e) {
                throw new HttpException_1.default(500, "server Error!!");
            }
        });
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map