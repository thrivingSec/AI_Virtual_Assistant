import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from 'fs'

config();

export const imageUpload = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const res = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log('Error in imageUpload :: ', error);
  }
};