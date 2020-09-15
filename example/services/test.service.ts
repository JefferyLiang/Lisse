import { Injectable, Inject } from "../../src";
import { Test1Service } from "./test1.service";
import { TestSlot } from "../slot/test.slot";

@Injectable()
export class TestService {
  @Inject() public test1: Test1Service;
  @Inject() public testSlot: TestSlot;

  public date: Date;

  constructor() {
    console.log(this.testSlot.hello());
    this.date = new Date();
  }
}
