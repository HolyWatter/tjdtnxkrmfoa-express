"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class TokenException extends HttpException_1.default {
    constructor() {
        super(401, "Authentication token missing");
    }
}
exports.default = TokenException;
//# sourceMappingURL=TokenException.js.map