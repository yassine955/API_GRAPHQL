import { Resolver, Query, Mutation, Arg } from 'type-graphql';

// import { isAuth } from '../middleware/isAuth';
// import { logger } from '../middleware/logger';

import { CreateBlogInput } from './BlogInput/CreateBlogInput';
import { Blog } from '../../entity/Blog';

@Resolver()
export class CreateBlogResolver {
  //   @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  @Query(() => [Blog], { nullable: true })
  async getBlogs() {
    const blog = await Blog.find({ relations: ['owner', 'category'] });
    console.log(blog);
    return blog;
  }

  @Query(() => Blog, { nullable: true })
  async fetchOneBlog(@Arg('id') id: number) {
    const blog = await Blog.findOne(id, { relations: ['owner', 'category'] });
    if (!blog) return null;
    console.log(blog);

    return blog;
  }

  @Mutation(() => Blog, { nullable: true })
  async getBlog(@Arg('id') id: number) {
    const blog = await Blog.findOne(id, { relations: ['owner', 'category'] });

    if (!blog) return null;
    console.log(blog);

    return blog;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteBlog(@Arg('id') id: number) {
    const blog = await Blog.findOne(id);

    if (!blog) return null;
    await Blog.delete(id);
    return true;
  }

  @Mutation(() => Blog)
  async CreateBlog(
    @Arg('data') { title, body, userId, categoryId }: CreateBlogInput
  ): Promise<Blog> {
    const blog = await Blog.create({
      title,
      body,
      author: 'Islamitisch Centrum Imam Malik',
      created_at: new Date().toISOString(),
      userId,
      categoryId
    }).save();
    console.log(blog);

    return blog;
  }
}
