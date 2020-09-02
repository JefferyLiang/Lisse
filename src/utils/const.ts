import debug from "debug";

export class Base {
  protected _logger: debug.Debugger;

  constructor(loggerName: string) {
    this._logger = debug(loggerName);
  }
}

export type ROUTER_METHOD = "get" | "put" | "post" | "delete" | "patch";
