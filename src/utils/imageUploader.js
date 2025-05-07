// utils/imageUploader.js
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: "image",
    });
    fs.unlinkSync(filePath); // Clean up the local file
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = uploadToCloudinary;
