import { httpService } from './httpsService';

export interface UserAuth {
  id: number,
  name: string,
  email: string,
  sex?: string,
  nationality?: string,
  token: string
}

export interface LoginProps {
  username: string,
  password: string,
}

type UserChangeHandler = (user: UserAuth | undefined) => void;

export class AuthService {
  private handler: UserChangeHandler | undefined = undefined;

  set changeHandler(handler: UserChangeHandler | undefined) {
    this.handler = handler;
  }

  private setCurrentUser(user: UserAuth | undefined) {
    console.log(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userPreferences');
    }

    this.handler?.(user);
  }

  get storedUser(): UserAuth | undefined {
    const userJson = localStorage.getItem('currentUser');
    const currentUser: UserAuth = userJson && JSON.parse(userJson);

    return currentUser ?? undefined;
  }


  async login({ username, password }: LoginProps) {
    const userAuth = await httpService.post<UserAuth>('/auth/login', {
      usernameOrEmail: username,
      password
    });

    this.setCurrentUser(userAuth);

    return userAuth;
  }

  public logout() {
    this.setCurrentUser(undefined);
  }
}

export const authService = new AuthService();
