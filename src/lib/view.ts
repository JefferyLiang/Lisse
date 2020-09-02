import "reflect-metadata";
import * as debug from "debug";
import { Resource } from "./resource";
import { ROUTER_METHOD } from "../utils/const";
import { Context, Next } from "koa";
import * as Router from "koa-router";
import { injector } from "../utils/injector";

interface LisseViewMap {
  path: string;
  method: ROUTER_METHOD;
  fn: (ctx: Context, next: Next) => any;
  methodName: string;
}

export const VIEW_PREFIX = Symbol("VIEW_PREFIX");
export const VIEW_PATH = Symbol("VIEW_PATH");
export const VIEW_METHOD = Symbol("VIEW_METHOD");

export const View = (prefix: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(VIEW_PREFIX, prefix, target);
  };
};

const ViewRestBuilder = (method: string) => (path: string): MethodDecorator => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(VIEW_PATH, path, descriptor.value);
    Reflect.defineMetadata(VIEW_METHOD, method.toLowerCase(), descriptor.value);
  };
};

export const Get = ViewRestBuilder("get");
export const Put = ViewRestBuilder("put");
export const Post = ViewRestBuilder("post");
export const Delete = ViewRestBuilder("delete");
export const Patch = ViewRestBuilder("patch");

function isConstructor(name: string): boolean {
  return name === "constructor";
}

function isRestFunction(fn: Function): boolean {
  return (
    Reflect.getMetadata(VIEW_PATH, fn) !== undefined &&
    Reflect.getMetadata(VIEW_METHOD, fn) !== undefined
  );
}

export class ViewResource extends Resource {
  private _logger: debug.Debugger;
  private _views: LisseViewMap[] = [];
  private _injector = injector;

  get views() {
    return this._views;
  }

  constructor(viewResourcePaths: string[]) {
    super(viewResourcePaths);
    this._logger = debug("lisse:resource:view");
  }

  private mapRoutes() {
    let routes: LisseViewMap[] = [];
    for (let resourceName in this._resources) {
      const cls = this._resources[resourceName];
      // get view class instance
      const instance = this._injector.injectAndBuildInstance(cls);
      // get prototype
      const prototype = Object.getPrototypeOf(instance);
      // get method name string array and filter
      const methodNames = Object.getOwnPropertyNames(prototype).filter(
        item => isRestFunction(prototype[item]) && !isConstructor(item)
      );
      const PREFIX = Reflect.getMetadata(VIEW_PREFIX, cls);
      // build routes
      methodNames.forEach(methodName => {
        const PATH = Reflect.getMetadata(VIEW_PATH, prototype[methodName]);
        const METHOD: ROUTER_METHOD = Reflect.getMetadata(
          VIEW_METHOD,
          prototype[methodName]
        );
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
    let _resources: { [key: string]: NodeRequire } = {};
    this._logger("view resources loading ...");
    for (let _module of this._loader.modules) {
      for (let key in _module) {
        if (Reflect.getMetadata(VIEW_PREFIX, _module[key])) {
          this._logger("Loaded view module", key);
          _resources[key] = _module[key];
        }
      }
    }
    this._logger("view resources loaded ...");
    return _resources;
  }

  _afterLoadResource() {
    this.mapRoutes();
  }

  public build(): Router {
    this._logger("view router building ...");
    const router = new Router();
    for (let route of this._views) {
      router[route.method](route.path, route.fn);
    }
    this._logger("view router build done ...");
    return router;
  }
}
