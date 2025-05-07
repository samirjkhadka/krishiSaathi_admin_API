// utils/qrcodeGenerator.js
const QRCode = require("qrcode");
const uploadToCloudinary = require("./imageUploader");

const generateAndUploadQRCode = async (data, farmerId) => {
  try {
    const qrCardFileName = `Farmer-${farmerId}-${Date.now()}.png`;
    const localPath = `src/uploads/${qrCardFileName}`;

    // Generate the QR code locally
    await QRCode.toFile(localPath, data, {
      color: {
        dark: "#000000", // Black dots
        light: "#ffffff", // White background
      },
      width: 300,
      margin: 2,
    });

    // Upload to Cloudinary
    const qrImageUrl = await uploadToCloudinary(localPath, "farmers/qr_codes");
    return qrImageUrl;
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    throw new Error("Failed to generate QR code");
  }
};

module.exports = generateAndUploadQRCode;
