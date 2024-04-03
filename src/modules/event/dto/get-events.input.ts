import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class GetEventsInput {
  @Field({ nullable: true })
  searchText?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  onlyUpcoming?: boolean;
}
