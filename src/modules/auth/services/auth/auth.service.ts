import { Injectable } from '@nestjs/common';
import { AwsCognitoAuthService } from '../aws-cognito-auth/aws-cognito-auth.service';
import {
  IAuthService,
  LoginData,
  RegisterData,
} from './auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly awsCognitoAuthService: AwsCognitoAuthService) {}

  async register(data: RegisterData): Promise<string> {
    return this.awsCognitoAuthService.register(data);
  }

  async login(data: LoginData) {
    return this.awsCognitoAuthService.login(data);
  }

  async verifyUser(data: { username: string; code: string }) {
    return this.awsCognitoAuthService.verifyUser(data);
  }

  async logout(userId: string) {
    return this.awsCognitoAuthService.logout(userId);
  }
}
