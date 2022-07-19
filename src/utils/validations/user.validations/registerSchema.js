import * as yup from "yup";

export const registerSchema = yup.object({
  userName: yup
    .string()
    .required("First name is required")
    .matches(
      /^[a-z0-9]+$/,
      "Field must consist of lowercase letters or numbers only and no spaces"
    ),
  firstName: yup
    .string()
    .required("First name is required")
    .matches(
      /^[A-Za-z]+$/,
      "Should field with the alphabet with spaces format"
    ),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(
      /^[A-Za-z]+$/,
      "Should field with the alphabet with spaces format"
    ),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%./^&*()_+<>,~`"':;]{8,}$/,
      `Password should be 8 digits length at least, contains at least one Capital letter, contains at least one number.)`
    ),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords should matches"),
});
