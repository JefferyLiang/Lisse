import * as fs from "fs";
import debug from "debug";

export class Loader {
  private _logger: debug.Debugger;
  protected _modules: any[];

  get modules() {
    return this._modules;
  }

  constructor() {
    this._logger = debug("lisse:loader");
  }

  public loadFileModules(paths: string[]) {
    let existPaths = this.filterExistDir(paths);
    let files = this.getFiles(existPaths);
    this._modules = files.map(filePath => require(filePath));
  }

  private filterExistDir(paths: string[]) {
    return paths.filter(path => {
      let exist = fs.existsSync(path);
      if (!exist) {
        this._logger("[Loader]", path, "file not exist");
      }
      return exist;
    });
  }

  private getFiles(paths: string[]): string[] {
    let files = [];
    for (let path of paths) {
      files.push(...fs.readdirSync(path).map(val => `${path}/${val}`));
    }
    return files;
  }
}
