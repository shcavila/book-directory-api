import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  id?: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
