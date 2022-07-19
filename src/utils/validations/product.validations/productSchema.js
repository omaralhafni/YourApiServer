import * as yup from "yup";

export const addProductSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least two characters long")
    .required("Name is required"),
  images: yup
    .array()
    .of(yup.string())
    .min(1, "Images should be one at least")
    .max(7, "Images max is 7")
    .required("Images is required"),
  imageBanner: yup.string(),
  description: yup
    .string()
    .min(20, "The description must be at least 20 characters long")
    .required("Description is required"),
  category: yup
    .string()
    .min(3, "The name must be at least 3 characters long")
    .required("category is required")
});

export const updateProductSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least two characters long"),
  images: yup
    .array()
    .of(yup.string())
    .min(1, "Images should be one at least")
    .max(7, "Images max is 7"),
  imageBanner: yup
    .string(),
  description: yup
    .string()
    .min(20, "The name must be at least 20 characters long"),
  category: yup
    .string()
    .min(3, "The name must be at least 3 characters long")
});
