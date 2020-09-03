import { Service, Injectable } from "../../src";

@Service()
@Injectable("Test1Service")
export class TestService {
  public date: Date;

  constructor(public test1: any, public test2: any) {
    this.date = new Date();
  }
}
