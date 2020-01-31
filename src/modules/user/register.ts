import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { logger } from '../middleware/logger';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  // Register user
  @Mutation(() => Boolean, { nullable: true })
  async register(
    @Arg('data')
    {
      email,
      firstName,
      lastName,
      password,
      re_password,
      nickname,
      avatar
    }: RegisterInput
  ): Promise<Boolean | null> {
    if (password === re_password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.create({
        firstName,
        lastName,
        email,
        nickname,
        password: hashedPassword,
        re_password: hashedPassword,
        avatar,
        created_at: new Date().toISOString()
      }).save();
      // await sendEmail(email, await createConfirmationUrl(user.id));

      return true;
    }
    return null;
  }
}
