"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../utils/const");
const view_1 = require("./view");
const service_1 = require("./service");
const Koa = require("koa");
const logger = require("koa-logger");
class LisseApp extends const_1.Base {
    constructor(option = {
        viewPaths: [],
        servicePaths: []
    }) {
        super("lisse:application");
        this._app = new Koa();
        if (option.apiLogger) {
            this._app.use(logger());
        }
        this.viewResource = new view_1.ViewResource(option.viewPaths);
        this.serviceResource = new service_1.ServiceResource(option.servicePaths);
    }
    get errHandler() {
        return this._errHandler || undefined;
    }
    setErrorHandler(cb) {
        this._errHandler = cb;
        return this;
    }
    start() {
        this._app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (err) {
                return this.errHandler
                    ? this.errHandler(err, ctx)
                    : ctx.app.emit("error", err, ctx);
            }
        });
        this.serviceResource.load();
        this.viewResource.load();
        let router = this.viewResource.build();
        this._app.use(router.routes());
        this._app.use(router.allowedMethods());
        this._logger("view router inject to application done ...");
        return this;
    }
    listen(port = 3000) {
        this._logger("application listen prot", port);
        return this._app.listen(port);
    }
    useBeforeRoutesInject(middleware) {
        this._app.use(middleware);
    }
    useAfterRoutesInject(middleware) {
        this._app.use(middleware);
    }
}
exports.LisseApp = LisseApp;
//# sourceMappingURL=app.js.map