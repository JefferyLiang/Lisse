import { Injectable } from "../../src";

@Injectable()
export class Test1Service {
  public date: Date;

  constructor() {
    this.date = new Date();
  }
}
