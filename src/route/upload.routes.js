import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

import { v2 as cloudinary } from 'cloudinary'

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|png|jpeg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  return extname && mimetype ? cb(null, true) : cb("Images only");
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path, (error, result) => { return result, error });
  res.send(upload?.url);
});

export default router;
