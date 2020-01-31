import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';
import { Blog } from './Blog';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  created_at: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', { unique: true })
  nickname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field()
  @Column('int', { default: 0 })
  tokenVersion: number;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;

  @Column()
  re_password: string;

  @Column('bool', { default: false })
  confirmed: Boolean;

  @OneToMany(
    () => Blog,
    blog => blog.owner
  )
  @JoinColumn()
  @Field(() => Blog)
  blogs: Blog[];
}
