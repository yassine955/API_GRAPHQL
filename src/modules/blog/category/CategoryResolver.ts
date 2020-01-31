import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Category } from '../../../entity/Category';
import { CreateCategoryInput } from './CategoryCreateInput';

// import { isAuth } from '../middleware/isAuth';
// import { logger } from '../middleware/logger';

@Resolver()
export class CategoryResolver {
  //   @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  @Query(() => [Category], { nullable: true })
  async getCategorys() {
    const category = await Category.find({ relations: ['blogs'] });
    console.log(category);
    return category;
  }

  @Mutation(() => Category)
  async CreateCategory(
    @Arg('data') { name }: CreateCategoryInput
  ): Promise<Category> {
    const category = await Category.create({
      name,
      created_at: new Date().toISOString()
    }).save();
    console.log(category);

    return category;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteCategory(@Arg('id') id: number) {
    const category = await Category.findOne(id);

    if (!category) return null;
    await Category.delete(id);
    return true;
  }
}
