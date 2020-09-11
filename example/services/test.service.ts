import { Injectable, Inject } from "../../src";
import { Test1Service } from "./test1.service";

@Injectable()
export class TestService {
  @Inject() public test1: Test1Service;

  public date: Date;

  constructor() {
    this.date = new Date();
  }
}
