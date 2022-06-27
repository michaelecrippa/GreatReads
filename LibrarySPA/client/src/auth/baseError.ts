export class BaseError {
  public stack?: string;

  constructor(public name: string, public message: string) {
    this.stack = new Error().stack;
  }
}