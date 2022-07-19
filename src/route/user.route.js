import express from "express";
import { getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// @desc Auth
// @access Public
// @route POST v1/users/login
router.route("/login").post(loginUser);
// @route POST v1/users/register
router.route("/register").post(registerUser);

// @desc Fetch user data and updated
// @route GET-PUT v1/users/profile
// @access Private/User
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
