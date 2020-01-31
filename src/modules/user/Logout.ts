import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../../types/MyContext';
import { sendRefreshToken } from './sendRefreshToken';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '');

    return true;
  }
}
