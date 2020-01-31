import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Category } from './Category';

@ObjectType()
@Entity()
export class Blog extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field()
  @Column()
  created_at: string;

  @Field()
  @Column()
  author: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(
    () => Category,
    category => category.blogs
  )
  @JoinColumn({ name: 'categoryId' })
  @Field(() => Category)
  category: Category;

  @ManyToOne(
    () => User,
    user => user.blogs
  )
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  owner: User;
}
