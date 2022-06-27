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

type UserChangeHandler = (user: UserAuth | null) => void;

export class AuthService {
  private handler: UserChangeHandler | null = null;

  set changeHandler(handler: UserChangeHandler | null) {
    this.handler = handler;
  }

  private setCurrentUser(user: UserAuth | null) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userPreferences');
    }

    this.handler?.(user);
  }

  get storedUser(): UserAuth | null {
    const userJson = localStorage.getItem('currentUser');
    const currentUser: UserAuth = userJson && JSON.parse(userJson);

    return currentUser ?? null;
  }


  async login({ username, password }: LoginProps) {
    const userAuth = await httpService.post<UserAuth>('/users/login', {
      usernameOrEmail: username,
      password
    });

    this.setCurrentUser(userAuth);
  }

  public logout() {
    this.setCurrentUser(null);
  }
}

export const authService = new AuthService();
