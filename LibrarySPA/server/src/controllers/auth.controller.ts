import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import UserService from '@/services/users.service';
import { ValidationError } from '@/exceptions/ValidationException';
import { LoginInput } from '@/dtos/loginUser.dto';
import { UserTransformer } from '@/transformers/userTransformer';

class AuthController {
  public userService = new UserService();
  private userTransformer = new UserTransformer();

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      if (!userData || (!userData.name && !userData.email && !userData.password)) {
        res.status(400).send({ message: 'Incomplete parameters!' });
        return;
      }

      const signUpUserData = await this.userService.register(userData);
      if (!signUpUserData) {
        res.status(500).json({ message: 'Internal error occured while performing registration!' });
        return;
      }

      res.status(201).json({ data: signUpUserData, message: 'User successfulty registered!' });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({ key: error.key, name: error.name, message: error.message });
        return;
      }
      res.json({ message: error.message });
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { usernameOrEmail, password }: LoginInput = req.body;

      if (!usernameOrEmail || !password) {
        res.status(400).send({ message: 'Incomplete parameters!' });
        return;
      }

      let user: User | null;

      user = await this.userService.nameLogin(usernameOrEmail, password);
      if (!user) {
        user = await this.userService.emailLogin(usernameOrEmail, password);
      }

      if (!user) {
        res.status(401).json({ message: 'Invalid username / email or password!' });
        return;
      }

      res.json({ data: this.userTransformer.transformWithToken(user) });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
