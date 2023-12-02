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
const app_1 = require("../app");
const auth_service_1 = require("./auth.service");
const user_create_dto_1 = require("../user/dto.ts/user.create.dto");
const validation_middleware_1 = require("../../src/middleware/validation.middleware");
const login_dto_1 = require("./dto/login.dto");
const WrongAuthenticationExecption_1 = require("../../src/exceptions/WrongAuthenticationExecption");
class AuthController {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.registration = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            try {
                const user = yield this.authService.register(userData);
                res.status(200).json({
                    message: "회원가입에 성공했습니다.",
                    data: user,
                });
            }
            catch (err) {
                next(err);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = req.body;
            try {
                const token = yield this.authService.login(logInData);
                res.status(200).json(token);
            }
            catch (_a) {
                new WrongAuthenticationExecption_1.default();
            }
        });
        this.logout = (req, res) => {
        };
        const appInstance = app_1.default.getInstance([]);
        this.db = appInstance.getDB();
        this.authService = new auth_service_1.default(this.db);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_create_dto_1.default), this.registration);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(login_dto_1.default), this.login);
        this.router.post(`${this.path}/logout`, this.logout);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map