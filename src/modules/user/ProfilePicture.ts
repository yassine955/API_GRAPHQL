import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

import { Upload } from '../../types/Upload';

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg('picture', () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}

// To post a picture do this
// KEY: operations: {"query":"mutation AddProfilePicture($picture: Upload!) {\n  addProfilePicture(picture: $picture)\n}\n"}
// KEY: map: {"0": ["variables.picture"] }
// KEY: 0 === FILE
