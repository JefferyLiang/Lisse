"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const debug = require("debug");
const loader_1 = require("../utils/loader");
const Router = require("koa-router");
exports.VIEW_PREFIX = Symbol("VIEW_PREFIX");
exports.VIEW_PATH = Symbol("VIEW_PATH");
exports.VIEW_METHOD = Symbol("VIEW_METHOD");
exports.View = (prefix) => {
    return target => {
        Reflect.defineMetadata(exports.VIEW_PREFIX, prefix, target);
    };
};
const ViewRestBuilder = (method) => (path) => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(exports.VIEW_PATH, path, descriptor.value);
        Reflect.defineMetadata(exports.VIEW_METHOD, method.toLowerCase(), descriptor.value);
    };
};
exports.Get = ViewRestBuilder("get");
exports.Put = ViewRestBuilder("put");
exports.Post = ViewRestBuilder("post");
exports.Delete = ViewRestBuilder("delete");
exports.Patch = ViewRestBuilder("patch");
function isConstructor(name) {
    return name === "constructor";
}
function isRestFunction(fn) {
    return (Reflect.getMetadata(exports.VIEW_PATH, fn) !== undefined &&
        Reflect.getMetadata(exports.VIEW_METHOD, fn) !== undefined);
}
class ViewResource {
    constructor(viewResourcePaths) {
        this._views = [];
        this.resources = new Map();
        this.paths = viewResourcePaths;
        this._logger = debug("lisse:resource:view");
        this.loader = new loader_1.Loader();
    }
    get views() {
        return this._views;
    }
    mapRoutes() {
        let routes = [];
        for (let resourceName of this.resources.keys()) {
            const cls = this.resources.get(resourceName);
            const instance = new cls();
            const prototype = Object.getPrototypeOf(instance);
            const methodNames = Object.getOwnPropertyNames(prototype).filter(item => isRestFunction(prototype[item]) && !isConstructor(item));
            const PREFIX = Reflect.getMetadata(exports.VIEW_PREFIX, cls);
            methodNames.forEach(methodName => {
                const PATH = Reflect.getMetadata(exports.VIEW_PATH, prototype[methodName]);
                const METHOD = Reflect.getMetadata(exports.VIEW_METHOD, prototype[methodName]);
                routes.push({
                    path: `${PREFIX}${PATH}`,
                    method: METHOD,
                    fn: prototype[methodName].bind(instance),
                    methodName
                });
            });
            this._views = routes;
            this._logger("=====", "[ VIEWS LOADED MAP ]", "=====");
            this._logger(this._views);
        }
    }
    _loadResources() {
        this._logger("view resources loading ...");
        for (let _module of this.loader.modules) {
            for (let key in _module) {
                if (Reflect.getMetadata(exports.VIEW_PREFIX, _module[key])) {
                    if (!this.resources.has(key)) {
                        this._logger("Loaded view module", key);
                        this.resources.set(key, _module[key]);
                    }
                }
            }
        }
        this._logger("view resources loaded ...");
    }
    _afterLoadResource() {
        this.mapRoutes();
    }
    load() {
        this.loader.loadFileModules(this.paths);
        this._loadResources();
        this._afterLoadResource();
    }
    build() {
        this._logger("view router building ...");
        const router = new Router();
        for (let route of this._views) {
            router[route.method](route.path, route.fn);
        }
        this._logger("view router build done ...");
        return router;
    }
}
exports.ViewResource = ViewResource;
//# sourceMappingURL=view.js.map