import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().when("isEmail", {
    is: '1',
    then: yup.string()
      .email("Please enter valid email")
      .required("email cannot be empty"),
    otherwise: yup.string()
      .required("user name cannot be empty")
      .min(4, 'user name must be at least 4 char'),
  }),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%./^&*()_+<>,~`"':;]{8,}$/,
      `Password should be 8 digits length at least, contains at least one Capital letter, contains at least one number.)`
    ),
});
