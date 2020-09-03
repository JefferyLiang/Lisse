import { View, Get, Injectable, LisseError, Post } from "../../src";
import { Context } from "koa";

@View("/api/tester")
@Injectable("TestService")
export class TesterView {
  constructor(public test_service: any) {
    this.test_service = test_service;
  }

  @Get("")
  public hello(ctx: Context) {
    ctx.body = {
      test: this.test_service.date,
      test1: this.test_service.test1.date
    };
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
