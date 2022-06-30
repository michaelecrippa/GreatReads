import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  nationality?: string;

  age?: string | number;

  @IsString()
  sex?: string;
}
