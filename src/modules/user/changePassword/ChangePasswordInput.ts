import { InputType, Field } from 'type-graphql';
import { Min } from 'class-validator';
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  @Min(5)
  token: string;
}
