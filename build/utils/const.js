"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
class Base {
    constructor(loggerName) {
        this._logger = debug_1.default(loggerName);
    }
}
exports.Base = Base;
//# sourceMappingURL=const.js.map