import { View, Get, Injectable, LisseError } from "../../src";
import { Context } from "koa";

@View("/api/tester")
@Injectable("TestService")
export class TesterView {
  constructor(public test_service: any) {
    this.test_service = test_service;
  }

  @Get("")
  public hello(ctx: Context) {
    ctx.body = this.test_service.date;
  }

  @Get("/error")
  public throwErr(ctx: Context) {
    ctx.throw(new LisseError("Unkonw error", 400));
  }
}
