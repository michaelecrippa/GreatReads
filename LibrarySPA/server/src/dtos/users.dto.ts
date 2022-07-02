import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsNumber()
  nationality?: number;

  age?: string | number;

  @IsString()
  sex?: string;
}
