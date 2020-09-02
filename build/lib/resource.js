"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../utils/loader");
class Resource {
    constructor(resourcePaths) {
        this.resourcePaths = resourcePaths;
        this._loader = new loader_1.Loader();
        this._resources = {};
    }
    _afterLoadResource() { }
    load() {
        this._loader.loadFileModules(this.resourcePaths);
        this._resources = this._loadResources();
        this._afterLoadResource();
    }
}
exports.Resource = Resource;
//# sourceMappingURL=resource.js.map