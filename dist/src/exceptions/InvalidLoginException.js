"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InvalidLoginException extends HttpException_1.default {
    constructor() {
        super(400, "로그인 정보가 잘 못 됐습니다.");
    }
}
exports.default = InvalidLoginException;
//# sourceMappingURL=InvalidLoginException.js.map