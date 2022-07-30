import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dodcn2kmk',
  api_key: '846415349151557',
  api_secret: 'pmR9HWghtGj2GsD1MG08enetc4A',
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
