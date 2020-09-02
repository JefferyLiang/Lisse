"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
require("reflect-metadata");
const LISSE_INJECTABLE = Symbol("LISSE_INJECTABLE");
class Injector {
    constructor() {
        this._resources = new Map();
        this._logger = debug_1.default("lisse:injector");
    }
    get size() {
        return this._resources.size;
    }
    injectAndBuildInstance(target) {
        let injectServices = Reflect.getMetadata(LISSE_INJECTABLE, target);
        const args = injectServices.map((name) => {
            if (this._resources.has(name)) {
                const cls = this.getResourceByName(name);
                return new cls();
            }
            else {
                return undefined;
            }
        });
        this._logger("building", target.name, "with args", args);
        return new target(...args);
    }
    addResources(resources) {
        for (let key in resources) {
            this._resources.set(key, resources[key]);
        }
    }
    getResourceByName(name) {
        if (this._resources.has(name)) {
            return this._resources.get(name);
        }
        else {
            throw new Error(`Can not find resource ${name}`);
        }
    }
}
exports.Injectable = (...args) => target => {
    Reflect.defineMetadata(LISSE_INJECTABLE, args, target);
};
exports.injector = new Injector();
//# sourceMappingURL=injector.js.map