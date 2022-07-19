export async function validator(validationSchema, obj) {
  return await validationSchema.validate(obj);
}
