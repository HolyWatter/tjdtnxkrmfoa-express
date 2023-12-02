"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class EmailException extends HttpException_1.default {
    constructor(email) {
        super(400, `${email}로 가입된 메일이 이미 존재합니다.`);
    }
}
exports.default = EmailException;
//# sourceMappingURL=EmailExistException.js.map