import { ClassType, InputType, Field } from 'type-graphql';

export const OKMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class OkInput extends BaseClass {
    @Field()
    ok: Boolean;
  }
  return OkInput;
};
