const { createFarmer } = require("../../models/farmer/farmer.model");
const {
  createFarmerBankAccount,
} = require("../../models/farmer/farmerBankAccount.model");
const { createFarmerKyc } = require("../../models/farmer/farmerKYC.model");
const {
  createFarmerQRCard,
} = require("../../models/farmer/farmerQRCard.model");
const uploadToCloudinary = require("../../utils/imageUploader");
const { errorResponse } = require("../../utils/responseFormatter");

const createFarmerWithKYC = async (
  farmerData,
  IdfrontImage,
  IdbackImage,
  passportImage,
  panImage
) => {
  try {
    const farmer = await createFarmer(farmerData);

    //upload image to cloudinary
    const documentFrontImageUrl = await uploadToCloudinary(
      IdfrontImage,
      "farmer_kyc/documents"
    );
    const documentBackImageUrl = await uploadToCloudinary(
      IdbackImage,
      "farmers/documents"
    );
    const passportPhotoUrl = await uploadToCloudinary(
      passportImage,
      "farmers/photos"
    );
    const panImageUrl = await uploadToCloudinary(panImage, "farmers/pan");

    //create farmer kyc
    const kycData = {
      farmer_id: farmer.id,
      document_front_image: documentFrontImageUrl,
      document_back_image: documentBackImageUrl,
      passport_photo: passportPhotoUrl,
      pan_image: panImageUrl,
    };

    const farmerKYC = await createFarmerKyc(kycData);

    //create a QR Card for farmer
    const qrCode = `Farmer-${farmer.id}-${Date.now()}`;
    const cardData = {
      farmer_id: farmer.id,
      qr_code: qrCode,
      qr_card_number: `QR${Date.now()}`,
    };

    const qrCard = await createFarmerQRCard(cardData);

    const bankAccountData = {
      farmer_id: farmer.id,
      account_number: `ACC${Date.now()}`,
      bank_name: "Krishi Saathi Bank",
      account_name: farmerData.full_name,
    };

    const bankAccount = await createFarmerBankAccount(bankAccountData);
    return {
      farmer: farmer,
      farmerKYC: farmerKYC,
      qrCard: qrCard,
      bankAccount: bankAccount,
    };
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Farmer Creation Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

module.exports = {
  createFarmerWithKYC,
};
