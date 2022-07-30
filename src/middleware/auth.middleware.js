import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import { HttpUnAuth } from "../utils/index.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  const { authorization } = req.headers;
  const { JWT_SECRET } = process.env;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (req.user) next();
      else {
        throw new HttpUnAuth("Not authorized");
      }
    } catch (error) {
      throw new HttpUnAuth("Not authorized");
    }
  }

  if (!token) {
    throw new HttpUnAuth("Not authorized, token failed");
  }
});

export const protectAdminRoute = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    throw new HttpUnAuth("Not Authorized as admin");
  }
});