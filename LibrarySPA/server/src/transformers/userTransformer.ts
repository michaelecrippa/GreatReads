import { User } from '@/interfaces/users.interface';

export class UserTransformer {
  transform(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      sex: user.sex,
      nationality: user.nationality,
    };
  }

  transformWithToken(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      sex: user.sex,
      nationality: user.nationality,
      token: user.token,
    };
  }
}
