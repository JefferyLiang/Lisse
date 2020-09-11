import { Base } from "../utils/const";
import { ViewResource } from "./view";
import { LisseError } from "../utils/error";
import * as Koa from "koa";
import * as logger from "koa-logger";

interface LissAppOption {
  viewPaths: string[];
  apiLogger?: boolean;
  timeout?: number;
}

export class LisseApp extends Base {
  private _app: Koa;
  private viewResource: ViewResource;
  // private serviceResource: ServiceResource;
  private _errHandler: (err: LisseError | Error, ctx: Koa.Context) => void;
  private _beforeRoutesInjectMiddlewares: Koa.Middleware[] = [];
  private _afterRoutesInjectMiddlewares: Koa.Middleware[] = [];

  get errHandler() {
    return this._errHandler || undefined;
  }

  get koa() {
    return this._app;
  }

  constructor(
    option: LissAppOption = {
      viewPaths: []
    }
  ) {
    super("lisse:application");
    this._app = new Koa();
    if (option.apiLogger) {
      this._app.use(logger());
    }
    this.viewResource = new ViewResource(option.viewPaths);
    // this.serviceResource = new ServiceResource(option.servicePaths);
  }

  public setErrorHandler(
    cb: (error: LisseError | Error, ctx: Koa.Context) => void
  ) {
    this._errHandler = cb;
    return this;
  }

  private beforeRoutesInjectHook() {
    for (let mid of this._beforeRoutesInjectMiddlewares) {
      this._app.use(mid);
      this._logger("koa middleware", mid.name, "injected");
    }
  }

  private afterRoutesInjectHook() {
    for (let mid of this._afterRoutesInjectMiddlewares) {
      this._app.use(mid);
      this._logger("koa middleware", mid.name, "injected");
    }
  }

  public start() {
    this._app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        return this.errHandler
          ? this.errHandler(err, ctx)
          : ctx.app.emit("error", err, ctx);
      }
    });
    this.beforeRoutesInjectHook();
    // services
    // this.serviceResource.load();
    // views
    this.viewResource.load();
    let router = this.viewResource.build();
    this._app.use(router.routes());
    this._app.use(router.allowedMethods());
    this._logger("view router inject to application done ...");
    this.afterRoutesInjectHook();
    return this;
  }

  public listen(port: number = 3000) {
    this._logger("application listen prot", port);
    return this._app.listen(port);
  }

  public useBeforeRoutesInject(middleware: Koa.Middleware) {
    this._beforeRoutesInjectMiddlewares.push(middleware);
  }

  public useAfterRoutesInject(middleware: Koa.Middleware) {
    this._afterRoutesInjectMiddlewares.push(middleware);
  }
}
