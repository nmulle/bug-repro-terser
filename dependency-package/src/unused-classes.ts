class RelatedClass {}

class BaseClass {}

export class SubClass extends BaseClass {

  /**
   * If this field is either not static or completely removed, the error does not happen.
   */
  static readonly field: RelatedClass = new RelatedClass()

}


/**
 * Error also still happens if this is exported.
 * If at least one of `oneUse` or `otherUse` are defined, it happens.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - for the bug to happen it needs to be defined
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const subclassUser = {
  oneUse: SubClass,
  otherUse() {
    return new SubClass()
  }
}
