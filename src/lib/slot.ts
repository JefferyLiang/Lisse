export abstract class LisseSlot {
  public abstract start(): void;
}

export abstract class LisseDatabaseSlot extends LisseSlot {
  protected abstract _database: any;
  protected abstract CONFIG: any;

  get database() {
    return this._database;
  }
}
