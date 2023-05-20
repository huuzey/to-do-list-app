const cloudinaryModule = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
const cloud = cloudinaryModule.v2;

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET,
});
module.exports = cloud;
