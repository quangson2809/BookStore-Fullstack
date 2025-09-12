export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}