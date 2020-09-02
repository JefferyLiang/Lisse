import { Service } from "../../src";

@Service()
export class TestService {
  public date: Date;

  constructor() {
    this.date = new Date();
  }
}
