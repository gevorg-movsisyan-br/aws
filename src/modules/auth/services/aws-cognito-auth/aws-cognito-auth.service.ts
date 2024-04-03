import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/common/constants/environment';
import {
  IAwsCognitoAuthService,
  RegisterData,
  LoginData,
  LoginResponse,
  VerifyUserData,
} from './aws-cognito-service.interface';

@Injectable()
export class AwsCognitoAuthService implements IAwsCognitoAuthService {
  private readonly userPool: CognitoUserPool;

  constructor(private readonly configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get(Environment.COGNITO_USER_POOL_ID),
      ClientId: this.configService.get(Environment.COGNITO_CLIENT_ID),
    });
  }

  async register(data: RegisterData): Promise<string> {
    const { email, password, firstName, lastName } = data;

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: lastName,
      }),
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result.user.getUsername());
        },
      );
    });
  }

  async login(user: LoginData) {
    const { email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise<LoginResponse>((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            idToken: result.getIdToken().getJwtToken(),
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async verifyUser(data: VerifyUserData) {
    const { username, code } = data;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise<void>((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  async logout(username: string) {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool,
    });

    return new Promise<void>((resolve) => {
      cognitoUser.signOut();

      resolve();
    });
  }
}
