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
const user_service_1 = require("./user.service");
const app_1 = require("../app");
const authMiddleware_1 = require("../middleware/authMiddleware");
class UserController {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.currentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.user.id;
            const user = yield this.userService.currentUser(uid);
            res.json(user);
        });
        const appInstance = app_1.default.getInstance([]);
        const db = appInstance.getDB();
        this.userService = new user_service_1.default(db);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, authMiddleware_1.default, this.currentUser);
        this.router.post(this.path, this.userService.createUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map