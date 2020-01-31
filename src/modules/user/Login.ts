import { Resolver, Mutation, Arg, Ctx, ObjectType, Field } from 'type-graphql';
import { compare } from 'bcryptjs';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { sendRefreshToken } from './sendRefreshToken';
import { createRefreshToken, createAccessToken } from '../middleware/auth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class LoginResolver {
  // Login user
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('bad password');
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }
}
