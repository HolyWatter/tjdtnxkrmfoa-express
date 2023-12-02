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
const EmailExistException_1 = require("../exceptions/EmailExistException");
const bcrypt = require("bcrypt");
const user_queries_1 = require("../../src/user/user.queries");
const jwt = require("jsonwebtoken");
const InvalidLoginException_1 = require("../exceptions/InvalidLoginException");
class AuthService {
    constructor(db) {
        this.register = (userData) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, nickname } = userData;
            const [rows] = (yield this.db
                .promise()
                .query(user_queries_1.default.getUserByEmail, [email]));
            if (rows.length) {
                throw new EmailExistException_1.default(email);
            }
            const hashedPasswrod = yield bcrypt.hash(password, 10);
            try {
                yield this.db
                    .promise()
                    .execute(user_queries_1.default.createUser, [
                    name,
                    nickname,
                    email,
                    hashedPasswrod,
                ]);
                const [result] = yield this.db
                    .promise()
                    .query(user_queries_1.default.getUserByEmail, [email]);
                return result[0];
            }
            catch (err) { }
        });
        this.login = (loginData) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginData;
            const [rows] = (yield this.db
                .promise()
                .query(user_queries_1.default.getUserByEmail, [email]));
            if (!rows.length)
                throw new InvalidLoginException_1.default();
            const isValidPassword = yield bcrypt.compare(password, rows[0].password);
            if (!isValidPassword)
                throw new InvalidLoginException_1.default();
            const payload = {
                email: rows[0].email,
                sub: rows[0].id,
            };
            return this.signJwt(payload);
        });
        this.signJwt = (payload) => __awaiter(this, void 0, void 0, function* () {
            const secret = process.env.JWT_SECRET;
            const accessToken = jwt.sign(payload, secret, {
                expiresIn: "3h",
            });
            const refreshToken = jwt.sign(payload, secret, {
                expiresIn: "5d",
            });
            return { accessToken, refreshToken };
        });
        this.db = db;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map