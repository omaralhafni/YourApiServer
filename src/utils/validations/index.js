import { validator } from "./validator.js";
import { loginSchema } from "./user.validations/loginSchema.js";
import { registerSchema } from "./user.validations/registerSchema.js";
import { updateProfileSchema } from "./user.validations/updateProfileSchema.js";

import { addProductSchema } from "./product.validations/productSchema.js";
import { updateProductSchema } from "./product.validations/productSchema.js";

export {
  validator,
  loginSchema,
  registerSchema,
  updateProfileSchema,

  addProductSchema,
  updateProductSchema,
};
