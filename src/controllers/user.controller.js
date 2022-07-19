import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import {
  validator,
  HttpStatus,
  HttpUnAuth,
  loginSchema,
  getUserObject,
  HttpBadRequest,
  registerSchema,
  helperUpdateUser,
  generateWebToken,
  HttpNotFoundRequest,
  updateProfileSchema
} from "../utils";


// @desc Login to the system
// @route GET v1/users/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
  try {
    await validator(loginSchema, req.body);
    const { email: loginEmail, password } = req.body;
    const email = loginEmail.toLowerCase();
    const user = await User
      .findOne({ $or: [{ 'email': email }, { 'userName': email }] })
      .select("_id email userName password");

    if (user && (await user.matchPassword(password))) {
      res.status(HttpStatus.OK).json(
        getUserObject(user, {
          token: generateWebToken(user._id),
        })
      );

    } else {
      throw new HttpUnAuth("Invalid email or password");
    }
  } catch (error) {
    throw new HttpBadRequest(error?.message);
  }
});

// @desc Register in the system
// @route GET v1/users/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    await validator(registerSchema, req.body);
    const { email: loginEmail, password, userName, firstName, lastName } = req.body;
    const email = loginEmail.toLowerCase();


    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      throw new HttpBadRequest("username already exists try another one");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new HttpBadRequest("email already exists");
    }

    const user = await User.create({
      email, password, userName, firstName, lastName
    });

    if (user) {
      res.status(HttpStatus.CREATED).json(
        getUserObject(user, {
          token: generateWebToken(user._id),
        })
      );
    } else {
      throw new HttpBadRequest("Invalid user data");
    }
    // catch for validator schema
  } catch (error) {
    throw new HttpBadRequest(error?.message);
  }
});

// @desc Fetch user profile
// @route GET v1/users/profile
// @access Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res
        .status(HttpStatus.CREATED)
        .json(getUserObject(user));
    } else {
      throw new HttpNotFoundRequest("User not found");
    }
  } catch (error) {
    throw new HttpBadRequest(error?.message);
  }
});

// @desc Update user profile
// @route PUt v1/users/profile
// @access Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    await validator(updateProfileSchema, req.body);
    const user = await User.findById(req.user._id)

    if (user) {
      const updatedUser = await (helperUpdateUser(req.body, user)).save();
      res.status(HttpStatus.OK).json(
        getUserObject(updatedUser, {
          token: generateWebToken(updatedUser._id),
        })
      );
    } else {
      throw new HttpNotFoundRequest("User not found");
    }
  } catch (error) {
    throw new HttpBadRequest(error?.message);
  }
});
