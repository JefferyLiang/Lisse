import { injector } from "../utils/injector";
import { Constructor } from "../utils/const";

export class InjectorProxy {
  private static _injector = injector;

  public static getInstance<T = any>(cls: Constructor<T>): T {
    let instance = this._injector.getInstance(cls);
    if (!instance) {
      throw new Error(`Can not find instance ${cls.name} in injector`);
    }
    return instance;
  }
}
