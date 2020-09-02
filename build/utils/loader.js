"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const debug_1 = require("debug");
class Loader {
    constructor() {
        this._logger = debug_1.default("lisse:loader");
    }
    get modules() {
        return this._modules;
    }
    loadFileModules(paths) {
        let existPaths = this.filterExistDir(paths);
        let files = this.getFiles(existPaths);
        this._modules = files.map(filePath => require(filePath));
    }
    filterExistDir(paths) {
        return paths.filter(path => {
            let exist = fs.existsSync(path);
            if (!exist) {
                this._logger("[Loader]", path, "file not exist");
            }
            return exist;
        });
    }
    getFiles(paths) {
        let files = [];
        for (let path of paths) {
            files.push(...fs.readdirSync(path).map(val => `${path}/${val}`));
        }
        return files;
    }
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map