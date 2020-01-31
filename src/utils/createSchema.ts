import { buildSchema } from 'type-graphql';
// import { ChangePasswordResolver } from '../modules/user/ChangePassword';
// import { ConfirmResolver } from '../modules/user/ConfirmUser';
// import { ForgotPasswordResolver } from '../modules/user/ForgotPassword';
import { LoginResolver } from '../modules/user/Login';
import { LogoutResolver } from '../modules/user/Logout';
import { MeResolver } from '../modules/user/Me';
import { RegisterResolver } from '../modules/user/Register';
import { CreateUserResolver } from '../modules/user/CreateUser';
import { ProfilePictureResolver } from '../modules/user/ProfilePicture';
import { GetUserResolver } from '../modules/user/GetUsers';
import { CreateBlogResolver } from '../modules/blog/CreateBlog';
import { CategoryResolver } from '../modules/blog/category/CategoryResolver';
import { RevokeUserResolver } from '../modules/user/revokeRefreshTokenForUsers';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      ProfilePictureResolver,
      GetUserResolver,
      CreateBlogResolver,
      CategoryResolver,
      RevokeUserResolver
    ]
  });
