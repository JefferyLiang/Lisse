import { Loader } from "../utils/loader";

export abstract class Resource {
  private resourcePaths: string[];
  protected _resources: { [key: string]: any };
  protected _loader: Loader;

  constructor(resourcePaths: string[]) {
    this.resourcePaths = resourcePaths;
    this._loader = new Loader();
    this._resources = {};
  }

  abstract _loadResources(): { [key: string]: any };

  _afterLoadResource() {}

  public load() {
    this._loader.loadFileModules(this.resourcePaths);
    this._resources = this._loadResources();
    this._afterLoadResource();
  }
}
