import { LisseSlot } from "../../src";

export class TestSlot extends LisseSlot {
  public start() {
    console.log("Slot running");
  }

  public hello() {
    return "Hello" + new Date();
  }
}
