export interface AdminLoginRequest {
  name: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token: string;
  message: string;
  name: string;
}