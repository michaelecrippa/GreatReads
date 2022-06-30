import { HttpException } from './HttpException';

export class ValidationError extends HttpException {
  constructor(public key: string, message: string) {
    super(404, message);
  }
}
