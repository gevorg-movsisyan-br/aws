export type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type VerifyUserData = {
  username: string;
  code: string;
};

export interface IAuthService {
  login(data: LoginData): Promise<LoginResponse>;
  register(data: RegisterData): Promise<string>;
  verifyUser(data: VerifyUserData): Promise<void>;
}
