import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './services/auth/auth.service';
import { RegisterInput } from './dto/register/register.input';
import { LoginInput } from './dto/login/login.input';
import { VerifyUserInput } from './dto/verifyUser/verify-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ICurrentUser } from './types/current-user.types';
import { LoginResponse } from './dto/login/login.response';
import { RegisterResponse } from './dto/register/register.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse, { name: 'register' })
  async register(@Args('registerInput') registerInput: RegisterInput) {
    const username = await this.authService.register(registerInput);

    return { username };
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => Boolean, { name: 'verifyUser', nullable: true })
  async verifyUser(@Args('verifyUserInput') verifyUserInput: VerifyUserInput) {
    await this.authService.verifyUser(verifyUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'logout', nullable: true })
  async logout(@CurrentUser() user: ICurrentUser) {
    await this.authService.logout(user.sub);
  }
}
