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
const category_queries_1 = require("./category.queries");
const HttpException_1 = require("../exceptions/HttpException");
class CategoryService {
    constructor(db) {
        this.db = db;
    }
    getUserCategory(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield this.db
                    .promise()
                    .query(category_queries_1.default.getUserCategory, [uid]);
                return rows;
            }
            catch (e) {
                console.log(e);
                throw new HttpException_1.default(500, "server Error");
            }
        });
    }
    createCategory(categoryName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .promise()
                    .execute(category_queries_1.default.createCategory, [categoryName, userId]);
            }
            catch (err) {
                throw new HttpException_1.default(500, "server Error");
            }
        });
    }
    deleteCategory(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.promise().query(category_queries_1.default.deleteCategory, [cid]);
            }
            catch (e) {
                console.log(e);
                throw new HttpException_1.default(500, "server Error");
            }
        });
    }
    updateCategory(categoryName, cid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .promise()
                    .query(category_queries_1.default.updateCategory, [categoryName, cid]);
            }
            catch (_a) {
                throw new HttpException_1.default(500, "server Error");
            }
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map