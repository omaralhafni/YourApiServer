import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    imageBanner: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
