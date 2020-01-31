import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  @Length(1, 255)
  name: string;
}
