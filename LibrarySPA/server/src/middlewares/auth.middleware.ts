import { NextFunction, Response } from 'express';
import { parse as parseBasicAuth } from 'basic-auth';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import UserService from '@/services/users.service';

const userService = new UserService();

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(400).json({ error: 'Missing authorization header!' });
      return;
    }

    const [authType, token] = authHeader.split(' ');
    let user: User;

    switch (authType) {
      case 'Basic':
        const header = parseBasicAuth(authHeader);

        if (!header) {
          res.status(401).json({ error: 'Malformed authorization header!' });
          return;
        }

        let userFound = await userService.nameLogin(header.name, header.pass);
        if (!userFound) {
          userFound = await userService.emailLogin(header.name, header.pass);
        }

        if (!userFound) {
          res.status(401).json({ error: 'Wrong username\\email or password!' });
          return;
        }
        user = userFound;
        break;

      case 'Bearer':
        const userFoundByToken = await userService.getUserByToken(token);
        if (!userFoundByToken) {
          res.status(401).json({ error: 'User not found!' });
          return;
        }
        user = userFoundByToken;
        break;

      default:
        res.status(401).json({ error: 'Invalid auth type!' });
        return;
    }

    res.locals.user = user;
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
