import { CanActivate, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../../common/constants/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.configService.get(Environment.COGNITO_USER_POOL_ID),
      clientId: this.configService.get(Environment.COGNITO_CLIENT_ID),
      tokenUse: 'id',
    });

    try {
      const token = this.extractTokenFromContext(ctx.getContext());

      if (!token) {
        console.log('No token');

        return false;
      }

      const payload = await verifier.verify(token);

      // console.log('Token is valid. Payload:', payload);

      const context = ctx.getContext();

      context.req.user = payload;
    } catch {
      console.log('Token not valid!');
      return false;
    }

    return true;
  }

  extractTokenFromContext(context: any) {
    try {
      const header = context.req.headers.authorization as string;

      if (!header) return false;

      return header.split(' ')[1];
    } catch (e) {
      return false;
    }
  }
}
