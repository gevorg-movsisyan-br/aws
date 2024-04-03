import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthResolver } from './auth.resolver';
import { AwsCognitoAuthService } from './services/aws-cognito-auth/aws-cognito-auth.service';

@Module({
  providers: [AuthResolver, AwsCognitoAuthService, AuthService],
})
export class AuthModule {}
