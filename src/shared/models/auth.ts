export interface SignRequest {
  username: string;
  email: string;
  full_name: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
