import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { isEmailAlreadyExist } from './isEmailAlreadyExist';
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @Length(1, 255)
  nickname: string;

  @Field()
  @Length(1, 255)
  avatar: string;

  @Field()
  @IsEmail()
  @isEmailAlreadyExist({ message: 'Email already in use...' })
  email: string;
}
