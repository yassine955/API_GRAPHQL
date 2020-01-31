import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Blog } from './Blog';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  created_at: string;

  @OneToMany(
    () => Blog,
    blog => blog.category
  )
  @JoinColumn()
  @Field(() => Blog)
  blogs: Blog[];
}
