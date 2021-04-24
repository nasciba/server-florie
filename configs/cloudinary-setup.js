const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products-images",
    format: async (req, file) => "jpg" || "png" || "webp",
    public_id: (req, file) => (req, file) => "computed-filename-using-request",
  },
});

const parser = multer({ storage: storage });
module.exports = parser;
