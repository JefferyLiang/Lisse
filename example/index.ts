import { LisseApp, LisseError } from "../src";
import * as path from "path";

const app = new LisseApp({
  viewPaths: [path.join(__dirname, "./views")],
  servicePaths: [path.join(__dirname, "./services")],
  apiLogger: true
});

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
