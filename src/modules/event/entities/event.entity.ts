import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => String)
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Number)
  startDate: number;
}
