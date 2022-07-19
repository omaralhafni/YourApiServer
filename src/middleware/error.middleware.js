import { HttpNotFoundRequest } from "../utils";

export const notFound = (req, res, next) => {
  throw new HttpNotFoundRequest(`Not Found - ${req.originalUrl}`);

};

export const errorHandler = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    res.status(status)
      .json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      });
  } catch (error) {
    next(error);
  }
};





















