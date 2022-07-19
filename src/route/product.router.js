import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
    createProduct,
    deleteProductForUser,
    getAllProductsForUser,
    updateProductForUser
} from "../controllers/product.controller.js";

const router = express.Router();

// @desc Fetch all products for user
// @route GET v1//products/:userId/
// @access Public
router
    .route("/:userId")
    .get(getAllProductsForUser);

// @desc create a product
// @route POST v1/products
// @access Private/User
router
    .route("/")
    .post(protect, createProduct);

// @desc update and delete products for user
// @route UPDATE-DELETE v1/products/:productId
// @access Private/User
router
    .route("/:productId")
    .put(protect, updateProductForUser)
    .delete(protect, deleteProductForUser);

export default router;