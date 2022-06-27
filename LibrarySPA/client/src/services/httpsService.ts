import { BaseError } from '../auth/baseError';
import { authService } from './authService';
import { REACT_APP_SERVER_ADDRESS } from '../config';

export class HttpError extends BaseError {
  constructor(public response: Response, public body: any) {
    super('HttpError', body?.message ||
      (typeof body === 'string' ? body : undefined) ||
      `Unexpected error occured`);
  }
}

export class HttpService {
  async get<T>(path: string) {
    return this.request<T>(path, 'get');
  }

  async post<T>(path: string, body: Record<string, any>) {
    return this.request<T>(path, 'post', body);
  }

  private async request<T>(path: string, method: string, body?: Record<string, any>) {
    const userToken = authService.storedUser?.token;

    const response = await fetch(`${REACT_APP_SERVER_ADDRESS}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(userToken ? { 'Authorization': `Bearer ${userToken}` } : undefined),
      },
      body: body && JSON.stringify(body),
    });

    if (response.status < 200 || response.status >= 300) {
      let responseBody = await response.text();
      try {
        responseBody = JSON.parse(responseBody);
      } catch (_error) {

      }
      throw new HttpError(response, responseBody);
    }
    const responseBody: T = await response.json();

    return responseBody;
  }
}

export const httpService = new HttpService();
