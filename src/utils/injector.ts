import debug from "debug";
import "reflect-metadata";

type Constructor<T = any> = new (...args: any[]) => T;

const LISSE_INJECTABLE = Symbol("LISSE_INJECTABLE");

class Injector {
  private _logger: debug.Debugger;
  private _resources = new Map<string, any>();

  get size() {
    return this._resources.size;
  }

  constructor() {
    this._logger = debug("lisse:injector");
  }

  public injectAndBuildInstance<T>(target: Constructor<T>): T {
    let injectServices = Reflect.getMetadata(LISSE_INJECTABLE, target);
    if (injectServices) {
      const args = injectServices.map((name: string) => {
        if (this._resources.has(name)) {
          const cls = this.getResourceByName(name);
          if (
            Reflect.getMetadata(LISSE_INJECTABLE, cls) &&
            cls.name !== target.name
          ) {
            return this.injectAndBuildInstance(cls);
          } else if (cls.name !== target.name) {
            return new cls();
          }
          throw EvalError(`Can not inject ${name} service into ${name}`);
        } else {
          throw EvalError(`Can not find inject service ${name}`);
        }
      });
      this._logger("building", target.name, "with args", args);
      return new target(...args);
    } else {
      return new target();
    }
  }

  public addResources(resources: { [key: string]: any }) {
    for (let key in resources) {
      this._resources.set(key, resources[key]);
    }
  }

  public getResourceByName(name: string) {
    if (this._resources.has(name)) {
      return this._resources.get(name);
    } else {
      throw new Error(`Can not find resource ${name}`);
    }
  }
}

export const Injectable = (...args: string[]): ClassDecorator => target => {
  Reflect.defineMetadata(LISSE_INJECTABLE, args, target);
};

export const injector = new Injector();
