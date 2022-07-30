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
} from "../utils/index.js";

// @desc Fetch all products for user
// @route GET v1/products/:userName
// @access Public
export const getAllProductsForUser = expressAsyncHandler(async (req, res) => {
  const { userName } = req.params;
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {}

  try {
    const total = await Product.countDocuments({ $and: [{ userName }, { ...keyword }] });
    const products = await Product.find({ $and: [{ userName }, { ...keyword }] })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const response = { products, page, pages: Math.ceil(total / pageSize), total }
    res.status(HttpStatus.OK).json({ ...response });

  } catch (error) {
    throw new HttpNotFoundRequest("There is no data for this user");
  }
}
);

// @desc Fetch a single product
// @route Get v1/products/:id
// @access Public
export const getProductByIDForUser = expressAsyncHandler(async (req, res) => {
  console.log('start');
  console.log('start1', req.params.productId);
  const product = await Product.findById(req.params.productId);
  if (product) res.status(HttpStatus.OK).json(product);
  else {
    throw new HttpNotFoundRequest("Product not found");
  }
});

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
    const { userName } = req.user;
    await validator(updateProductSchema, req.body);
    const product = await Product.findById(productId);

    if (product) {
      if (String(product.userName) == String(userName)) {
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
    const { userName } = req.user;
    const product = await Product.findById(productId);

    if (product) {
      if (String(product.userName) == String(userName)) {
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