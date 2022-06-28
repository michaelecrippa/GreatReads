import { httpService } from './httpsService';
import { UserInfoResponse } from '../models/userInfoResponse.model';
import { UserInput } from '../models/userInput.model';

class UserService {
  async createUser(input: UserInput) {
    await httpService.post('/users/register', input);
  }

  async takeUserInfo(id: number) {
    const response = await httpService.get<UserInfoResponse>(`/users/?id=${id}`);
    return response;
  }
}

export const userService = new UserService();