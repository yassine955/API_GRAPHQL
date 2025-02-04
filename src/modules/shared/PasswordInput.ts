import { InputType, Field } from 'type-graphql';

@InputType()
export class PasswordInput {
  @Field()
  password: string;

  @Field()
  re_password: string;
}
