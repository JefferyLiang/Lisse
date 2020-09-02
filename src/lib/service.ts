import debug from "debug";
import { injector } from "../utils/injector";
import { Resource } from "./resource";

const SERVICE_RESOURECE = Symbol("SERVICE_RESOURCE");

export const Service = (): ClassDecorator => target => {
  Reflect.defineMetadata(SERVICE_RESOURECE, target.name, target);
};

export class ServiceResource extends Resource {
  private _logger: debug.Debugger;
  private _injector = injector;

  get resources() {
    return this._resources;
  }

  constructor(serviceResourcePaths: string[]) {
    super(serviceResourcePaths);
    this._logger = debug("lisse:resource:service");
  }

  _loadResources() {
    let resources: { [key: string]: any } = {};
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
