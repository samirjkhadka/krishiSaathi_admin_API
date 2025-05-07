// utils/imageUploader.js
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

const uploadToCloudinary = async (filePath, folderName) => {
  try {
    console.log("Uploading file from path:", filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: "image",
      quality: "auto:low",
      transformation: [
        { width: 1024, crop: "limit" },
        { fetch_format: "auto" },
        { quality: "auto:low" },
      ],
    });
    // fs.unlinkSync(filePath); // Clean up the local file
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = uploadToCloudinary;
