import * as yup from "yup";

export const updateProfileSchema = yup.object({
  userName: yup
    .string()
    .matches(
      /^[a-z0-9]+$/,
      "Field must consist of lowercase letters or numbers only and no spaces"
    ),
  firstName: yup
    .string()
    .matches(
      /^[A-Za-z]+$/,
      "Should field with the alphabet with spaces format"
    ),
  lastName: yup
    .string()
    .matches(
      /^[A-Za-z]+$/,
      "Should field with the alphabet with spaces format"
    ),
  email: yup.string().email("Email is not valid"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%./^&*()_+<>,~`"':;]{8,}$/,
      `Password should be 8 digits length at least, contains at least one Capital letter, contains at least one number.)`
    ),
  profileImage: yup.string(),
  isAdmin: yup.bool(),
});
