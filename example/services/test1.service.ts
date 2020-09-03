import { Service } from "../../src";

@Service()
export class Test1Service {
  public date: Date;

  constructor() {
    this.date = new Date();
  }
}
