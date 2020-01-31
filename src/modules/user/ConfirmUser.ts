// import { Resolver, Mutation, Arg, Int } from 'type-graphql';

// import { redis } from '../../redis';
// import { User } from '../../entity/User';
// import { confirmUserPrefix } from '../constants/redisPrefixes';
// import { getConnection } from 'typeorm';

// @Resolver()
// export class ConfirmResolver {
//   // Confirm user
//   @Mutation(() => Boolean)
//   async confirmUser(@Arg('token') token: string): Promise<boolean> {
//     const userId = await redis.get(confirmUserPrefix + token);

//     if (!userId) return false;

//     User.update({ id: parseInt(userId, 10) }, { confirmed: true });
//     redis.del(token);

//     return true;
//   }

//   @Mutation(() => Boolean)
//   async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
//     await getConnection()
//       .getRepository(User)
//       .increment({ id: userId }, 'tokenVersion', 1);

//     return true;
//   }
// }
