import debug from "debug";

export class Injector {
  private readonly providerMap: Map<any, any> = new Map();
  private readonly instanceMap: Map<any, any> = new Map();
  private _logger: debug.Debugger = debug("lisse:injector");

  public setProvider(key: any, value: any): void {
    if (!this.providerMap.has(key)) {
      this._logger("Set provider key", key.name);
      this.providerMap.set(key, value);
    }
  }

  public getProvider(key: any): any {
    return this.providerMap.get(key);
  }

  public setInstance(key: any, value: any): void {
    if (!this.instanceMap.has(key)) {
      this._logger("Set up instance", key.name);
      this.instanceMap.set(key, value);
    }
  }

  public getInstance(key: any): any {
    return this.instanceMap.get(key);
  }
}

export const injector = new Injector();

export const Injectable = (): ClassDecorator => (target: any) => {
  injector.setProvider(target, target);
  return target;
};

export const Inject = (): PropertyDecorator => (
  target: any,
  propertyKey: string
) => {
  const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
  const _injector: Injector = injector;

  let providerInsntance = _injector.getInstance(propertyType);
  if (!providerInsntance) {
    let providerClass = _injector.getProvider(propertyType);
    providerInsntance = new providerClass();
    injector.setInstance(propertyType, providerInsntance);
  }
  target[propertyKey] = providerInsntance;
  return target[propertyKey];
};
