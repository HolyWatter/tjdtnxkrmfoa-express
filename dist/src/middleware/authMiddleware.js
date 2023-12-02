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
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const user_queries_1 = require("../user/user.queries");
const WrongAuthenticationExecption_1 = require("../exceptions/WrongAuthenticationExecption");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    const appInstance = app_1.default.getInstance([]);
    const db = appInstance.getDB();
    if (token) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(token, secret);
            const email = verificationResponse.email;
            const [row] = yield db
                .promise()
                .query(user_queries_1.default.getUserByEmail, [email]);
            if (row[0]) {
                req.user = row[0];
                next();
            }
            else {
                next(new WrongAuthenticationExecption_1.default());
            }
        }
        catch (_b) {
            next(new WrongAuthenticationExecption_1.default());
        }
    }
    else {
        next(new WrongAuthenticationExecption_1.default());
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map