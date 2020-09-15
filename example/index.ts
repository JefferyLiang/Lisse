import { LisseApp, LisseError } from "../src";
import * as path from "path";
import * as bodyParser from "koa-bodyparser";
import { TestSlot } from "./slot/test.slot";

const app = new LisseApp({
  viewPaths: [path.join(__dirname, "./views")],
  apiLogger: true
});

app.addSlot(TestSlot);
app.useBeforeRoutesInject(bodyParser());

app
  .setErrorHandler((err, ctx) => {
    if (err instanceof LisseError) {
      ctx.status = err.statusCode;
      ctx.body = {
        code: err.code,
        message: err.msg
      };
      ctx.app.emit("error", err, ctx);
    } else {
      throw err;
    }
  })
  .start()
  .listen(3000);
