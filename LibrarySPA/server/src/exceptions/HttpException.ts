export class HttpException extends Error {
  public name: string;
  public message: string;
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
