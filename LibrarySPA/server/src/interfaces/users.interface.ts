export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  nationality: string | undefined;
  sex: string | undefined;
  age: number | undefined;
  token: string | undefined;
}
