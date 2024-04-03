import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  idToken: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
