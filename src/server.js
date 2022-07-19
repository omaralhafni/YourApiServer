import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import swaggerUi from "swagger-ui-express";

import connectDB from "./config/db.js";
import userRoutes from "./route/user.route.js";
import productRouter from "./route/product.router.js";
import uploadRoutes from "./route/upload.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

const app = express();

// // Access control & connect middleware
// app.use(cors());

// // Module that loads environment variables from a .env
// dotenv.config();

// // Connecting to the database
// connectDB();

// // Middleware to limit repeated requests 
// app.use(
//   rateLimit({
//     windowMs: 60 * 1000,
//     max: 10,
//     skipSuccessfulRequests: false,
//   })
// );

// // logger middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // To remove data that contains forbidden characters
// app.use(mongoSanitize());

// app.use(express.json({}));

// // Swagger document
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// // route
// app.use("/v1/users", userRoutes);
// app.use("/v1/products", productRouter);
// app.use("/v1/upload", uploadRoutes);

// const __dirname = path.resolve();
// // upload route
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// } else {
//   app.get("/");
// }


// // Handle route Not found
// app.use(notFound);
// // Handle unknown error
// app.use(errorHandler);

// port
const port = process.env.PORT || 5050;

app.get("health", (res, req) => {
  res.status(200).send({
    "done": 'msg'
  })

})
// listen for application
app.listen(
  port,
  console.info(`server running on port ${port}`)
);
