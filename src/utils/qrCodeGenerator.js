// utils/qrcodeGenerator.js
const QRCode = require("qrcode");
const uploadToCloudinary = require("./imageUploader");
const { generateFarmerCardNumber } = require("./cardNumberGenerator");

const generateAndUploadQRCode = async (farmerData) => {
  try {
    const qrCardNumber = generateFarmerCardNumber();

    const qrData = {
      type: "farmer",
      farmer_id: farmerData.id,
      farmer_name: farmerData.full_name,
      farmer_phone: farmerData.phone,
      qr_card_number: qrCardNumber,
      created_at: new Date().toISOString(),
    };

    const qrDataString = JSON.stringify(qrData);

    const qrCardFileName = `Farmer-${farmerData.full_name}-${Date.now()}.png`;
    const localPath = `src/uploads/${qrCardFileName}`;

    // Generate QR Code
    await QRCode.toFile(localPath, qrDataString, {
      errorCorrectionLevel: "M", // Error correction level
      width: 300,
      height: 300,
      margin: 1,
    });

    // Upload to Cloudinary
    const qrImageUrl = await uploadToCloudinary(localPath, "farmers/qr_codes");
    return { qrImageUrl, qrCardNumber };
  } catch (error) {
    throw new Error("Failed to generate QR code");
  }
};

module.exports = generateAndUploadQRCode;
