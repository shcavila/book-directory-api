import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field()
  first_name: string;
  @Field({ nullable: true })
  middle_name?: string;
  @Field()
  last_name: string;
}
