"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("../utils/injector");
class InjectorProxy {
    static getInstance(cls) {
        let instance = this._injector.getInstance(cls);
        if (!instance) {
            throw new Error(`Can not find instance ${cls.name} in injector`);
        }
        return instance;
    }
}
exports.InjectorProxy = InjectorProxy;
InjectorProxy._injector = injector_1.injector;
//# sourceMappingURL=proxy.js.map