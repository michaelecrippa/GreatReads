export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  sex?: string;
  nationality?: string;
  token?: string;
}
