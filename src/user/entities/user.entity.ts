import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  first_name: string;
  @Prop()
  last_name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

@ObjectType()
export class UserFields {
  @Field()
  id: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class UserResponse {
  @Field()
  message: string;
  @Field(() => UserFields)
  data: UserFields;
}

@ObjectType()
export class UsersResponse {
  @Field()
  message: string;
  @Field(() => [UserFields])
  data: [UserFields];
}

@InputType()
export class UserFilterInput {
  id?: string | null;
  @Field({ nullable: true })
  first_name?: string | null;
  @Field({ nullable: true })
  last_name?: string | null;
  @Field({ nullable: true })
  email?: string | null;
  @Field({ nullable: true })
  password?: string | null;
}

@InputType()
export class UserFilter {
  @Field({ nullable: true })
  filter?: UserFilterInput;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserModel = Model<UserDocument>;
