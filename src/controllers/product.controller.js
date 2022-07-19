import Product from "../models/product.model.js";
import expressAsyncHandler from "express-async-handler";
import {
  validator,
  HttpUnAuth,
  HttpStatus,
  HttpBadRequest,
  addProductSchema,
  HttpNotFoundRequest,
  updateProductSchema,
  helperCreateProducts,
  helperUpdateProducts
} from "../utils";

// @desc Fetch all products for user
// @route GET v1/products/:userId
// @access Public
export const getAllProductsForUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const total = await Product.countDocuments({ userId: userId });
    const products = await Product.find({ userId: userId })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const response = { products, page, pages: Math.ceil(total / pageSize), total }
    res.status(HttpStatus.OK).json({ ...response });

  } catch (error) {
    throw new HttpNotFoundRequest("There is no data for this user");
  }
}
);

// @desc Create a product
// @route POST v1/products
// @access Private/user
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { body, user } = req;
    await validator(addProductSchema, body);

    const product = helperCreateProducts(body, user);
    const createdProduct = await product.save();
    res.status(HttpStatus.CREATED).json(createdProduct);

  } catch (e) {
    throw new HttpBadRequest(e?.message);
  }
});

// @desc Update products for user
// @route PUT v1/products/:productId
// @access Private/user
export const updateProductForUser = expressAsyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;
    await validator(updateProductSchema, req.body);
    const product = await Product.findById(productId);

    if (product) {
      if (String(product.userId) == String(_id)) {
        const updatedProduct = await (helperUpdateProducts(req.body, product)).save();
        res.status(HttpStatus.OK).json(updatedProduct);

      } else {
        throw new HttpUnAuth("You are not authorized to update this item");
      }
    } else {
      throw new HttpBadRequest("Product not found");
    }
  } catch (error) {
    throw new HttpBadRequest(error?.message);
  }
});

// @desc Delete products for user
// @route DELETE v1/products/:productId
// @access Private/user
export const deleteProductForUser = expressAsyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;
    const product = await Product.findById(productId);

    if (product) {
      if (String(product.userId) == String(_id)) {
        await product.remove();

        res.status(HttpStatus.OK).json({
          message: "Product deleted successfully",
        });
      } else {
        throw new HttpUnAuth("You are not authorized to delete this item");
      }
    } else {
      throw new HttpBadRequest("Product not found");
    }
  } catch (error) {
    throw new HttpBadRequest(error?.message);
  }
});