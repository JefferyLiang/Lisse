export class LisseError extends Error {
  public msg: string;
  public code: number;
  public statusCode: number;

  constructor(message: string, code: number, statusCode: number = 400) {
    super(message);
    this.msg = message;
    this.code = code;
    this.statusCode = statusCode;
  }
}
