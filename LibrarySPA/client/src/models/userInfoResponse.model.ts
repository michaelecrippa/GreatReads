export interface UserInfoResponse {
  user: {
    id: number;
    name: string;
    email: string;
    sex?: string;
    nationality?: string;
  }
}