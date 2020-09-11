import { View, Get, LisseError, Post, Inject } from "../../src";
import { Context } from "koa";
import { TestService } from "../services/test.service";

@View("/api/tester")
export class TesterView {
  @Inject() public testService: TestService;

  @Get("")
  public hello(ctx: Context) {
    console.log(this.testService.date);
    ctx.body = "hello";
  }

  @Get("/error")
  public throwErr(ctx: Context) {
    ctx.throw(new LisseError("Unkonw error", 400));
  }

  @Post("")
  public postData(ctx: Context) {
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
  }
}
