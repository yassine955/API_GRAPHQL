import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateBlogInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  body: string;

  @Field()
  userId: number;

  @Field()
  categoryId: number;
}
