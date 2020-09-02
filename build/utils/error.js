"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LisseError extends Error {
    constructor(message, code, statusCode = 400) {
        super(message);
        this.msg = message;
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.LisseError = LisseError;
//# sourceMappingURL=error.js.map