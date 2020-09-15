"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
class Injector {
    constructor() {
        this.providerMap = new Map();
        this.instanceMap = new Map();
        this._logger = debug_1.default("lisse:injector");
    }
    setProvider(key, value) {
        if (!this.providerMap.has(key)) {
            this._logger("Set provider key", key.name);
            this.providerMap.set(key, value);
        }
    }
    getProvider(key) {
        return this.providerMap.get(key);
    }
    setInstance(key, value) {
        if (!this.instanceMap.has(key)) {
            this._logger("Set up instance", key.name);
            this.instanceMap.set(key, value);
        }
    }
    getInstance(key) {
        return this.instanceMap.get(key);
    }
}
exports.Injector = Injector;
exports.injector = new Injector();
exports.Injectable = () => (target) => {
    exports.injector.setProvider(target, target);
    return target;
};
exports.Inject = () => (target, propertyKey) => {
    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    const _injector = exports.injector;
    let providerInsntance = _injector.getInstance(propertyType);
    if (!providerInsntance) {
        let providerClass = _injector.getProvider(propertyType);
        providerInsntance = new providerClass();
        exports.injector.setInstance(propertyType, providerInsntance);
    }
    target[propertyKey] = providerInsntance;
    return target[propertyKey];
};
//# sourceMappingURL=injector.js.map