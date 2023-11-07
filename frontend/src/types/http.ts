import { User } from "./User";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T | undefined;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface RequestOptions {
  params?: any;
  headers?: any;
  timeout?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
