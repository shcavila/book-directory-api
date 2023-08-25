import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;
@Schema()
export class Author {
  @Prop()
  first_name: string;
  @Prop({ nullable: true })
  middle_name: string;
  @Prop()
  last_name: string;
}

@ObjectType()
export class AuthorResponse {
  @Field(() => ID)
  id: string;
  @Field()
  first_name: string;
  @Field()
  middle_name: string;
  @Field()
  last_name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
export type AuthorModel = Model<AuthorDocument>;
