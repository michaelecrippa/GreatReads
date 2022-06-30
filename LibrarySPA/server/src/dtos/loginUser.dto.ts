import { IsString } from 'class-validator';

export class LoginInput {
  @IsString()
  usernameOrEmail: string;

  @IsString()
  password: string;
}
