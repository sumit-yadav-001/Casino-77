export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  balance: number;
  currency: string;
  isVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  referralCode: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface OtpRequest {
  type: 'phone' | 'email';
  value: string;
}

export interface OtpVerifyRequest {
  type: 'phone' | 'email';
  value: string;
  otp: string;
}

export interface TokenRefreshRequest {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
