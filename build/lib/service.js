"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const injector_1 = require("../utils/injector");
const resource_1 = require("./resource");
const SERVICE_RESOURECE = Symbol("SERVICE_RESOURCE");
exports.Service = () => target => {
    Reflect.defineMetadata(SERVICE_RESOURECE, target.name, target);
};
class ServiceResource extends resource_1.Resource {
    constructor(serviceResourcePaths) {
        super(serviceResourcePaths);
        this._injector = injector_1.injector;
        this._logger = debug_1.default("lisse:resource:service");
    }
    get resources() {
        return this._resources;
    }
    _loadResources() {
        let resources = {};
        this._logger("service resources loading ...");
        for (let _module of this._loader.modules) {
            for (let key in _module) {
                this._logger;
                if (Reflect.getMetadata(SERVICE_RESOURECE, _module[key])) {
                    this._logger("loaded service module", key);
                    resources[key] = _module[key];
                }
            }
        }
        this._logger("service resource loaded ...");
        this._injector.addResources(resources);
        return resources;
    }
}
exports.ServiceResource = ServiceResource;
//# sourceMappingURL=service.js.map