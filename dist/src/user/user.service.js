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
const user_queries_1 = require("./user.queries");
class UserService {
    constructor(db) {
        this.createUser = (req, res) => {
        };
        this.db = db;
    }
    currentUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.db
                .promise()
                .query(user_queries_1.default.getUserByUidWithoutPassword, [uid]);
            return rows;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map