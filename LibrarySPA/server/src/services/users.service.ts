import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@/models/users.model';
import { isEmpty } from '@utils/util';
import { RegistrationValidator } from '@/validators/registrationValidator';

import crypto from 'crypto';
import { compare } from 'bcrypt';

class UserService {
  async nameLogin(username: string, password: string) {
    const user = await UserModel.query().select().where({ name: username }).first();

    if (user && (await compare(password, user.password))) {
      const token = crypto.randomBytes(64).toString('hex');
      await user.$query().patch({ token });

      return user;
    }

    return undefined;
  }

  async emailLogin(email: string, password: string) {
    const user = await UserModel.query().select().where({ email: email }).first();

    if (user && (await compare(password, user.password))) {
      const token = crypto.randomBytes(64).toString('hex');
      await user.$query().patch({ token });

      return user;
    }

    return null;
  }

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.query().select().from('users');
    return users;
  }

  public async getUserById(userId: number): Promise<User> {
    const findUser: User = await UserModel.query().findById(userId);
    if (!findUser) throw new HttpException(409, 'User not found!');

    return findUser;
  }

  async getUserByName(name: string) {
    const user = await UserModel.query().select().where({ name }).first();
    if (!user) throw new HttpException(409, 'User not found!');

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await UserModel.query().select().where({ email }).first();
    if (!user) throw new HttpException(409, 'User not found!');

    return user;
  }

  async getUserByToken(token: string) {
    const user = await UserModel.query().select().where({ token }).first();
    if (!user) throw new HttpException(409, 'User not found!');

    return user;
  }

  async register(input: CreateUserDto) {
    const validator = new RegistrationValidator(input);
    await validator.validate();

    return this.createUser(input);
  }

  private async createUser(input: CreateUserDto) {
    const hashedPassword = await hash(input.password, 10);

    const user = await UserModel.query().insert({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      nationality: input.nationality,
      sex: input.sex,
    });

    const token = crypto.randomBytes(64).toString('hex');
    await user.$query().patch({ token });

    return user;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User[] = await UserModel.query().select().from('users').where('id', '=', userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await UserModel.query()
      .update({ ...userData, password: hashedPassword })
      .where('id', '=', userId)
      .into('users');

    const updateUserData: User = await UserModel.query().select().from('users').where('id', '=', userId).first();
    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await UserModel.query().select().from('users').where('id', '=', userId).first();
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserModel.query().delete().where('id', '=', userId).into('users');
    return findUser;
  }
}

export default UserService;
