import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    createProduct,
    deleteProductForUser,
    getAllProductsForUser,
    getProductByIDForUser,
    updateProductForUser
} from "../controllers/product.controller.js";

const router = express.Router();

// @desc Fetch all products for user
// @route GET v1//products/:userName/
// @access Public
router
    .route("/:userName")
    .get(getAllProductsForUser);

// @desc Fetch products for user
// @route Get v1/products/:productId
// @access Public
router
    .route("/:userName/:productId")
    .get(getProductByIDForUser);

// @desc Create a product
// @route POST v1/products
// @access Private/User
router
    .route("/")
    .post(protect, createProduct);

// @desc Update and delete products for user
// @route UPDATE-DELETE v1/products
// @access Private/User
router
    .route("/:productId")
    .put(protect, updateProductForUser)
    .delete(protect, deleteProductForUser);

export default router;