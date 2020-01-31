import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  UseMiddleware,
  Ctx
} from 'type-graphql';
import { User } from '../../entity/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class GetUserResolver {
  @Query(() => [User])
  async getUsers() {
    const user = await User.find({ relations: ['blogs'] });
    console.log(user);
    return user;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Mutation(() => User, { nullable: true })
  async getUser(@Arg('id') id: number) {
    const user = await User.findOne(id, { relations: ['blogs'] });
    if (!user) return null;
    console.log(user);
    return user;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteUser(@Arg('id', () => Int) id: number): Promise<Boolean | null> {
    const user = await User.findOne(id);
    if (!user) return null;
    await User.delete(user.id);
    return true;
  }
}
