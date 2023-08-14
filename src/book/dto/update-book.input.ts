import { CreateBookInput } from './create-book.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends CreateBookInput {
  @Field()
  id: string;
}
