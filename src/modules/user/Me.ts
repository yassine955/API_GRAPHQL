import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';

import { MyContext } from '../../types/MyContext';

import { User } from '../../entity/User';
import { verify } from 'jsonwebtoken';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class MeResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
