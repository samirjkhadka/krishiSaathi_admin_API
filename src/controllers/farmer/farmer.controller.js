const { createFarmerWithKYC } = require("../../services/farmer/farmer.service");
const {
  errorResponse,
  successResponse,
} = require("../../utils/responseFormatter");
const farmerKycValidation = require("../../validations/farmer/farmerKYC.validation");

const createFarmer = async (req, res) => {
  if (!req.body) {
    return errorResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  if (!req.files) {
    return errorResponse(res, {
      status: false,
      message: "Identification documents are required",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const { error, value } = farmerKycValidation.validate(req.body);
    if (error) {
      return errorResponse(res, {
        status: false,
        message: "Validation Error: " + error.message,
        data: error.details.map((detail) => detail.message),
        statusCode: 400,
      });
    }

    const IdfrontImage = req.files.document_front_image?.[0]?.path;
    const IdbackImage = req.files.document_back_image?.[0]?.path;
    const passportImage = req.files.passport_photo?.[0]?.path;
    const panImage = req.files.pan_image?.[0]?.path;

    if (!IdfrontImage || !IdbackImage || !passportImage || !panImage) {
      return errorResponse(res, {
        status: false,
        message: "All Identification documents are required",
        data: {},
        statusCode: 400,
      });
    }

    const farmerData = await createFarmerWithKYC(
      value,
      IdfrontImage,
      IdbackImage,
      passportImage,
      panImage
    );

    return successResponse(res, {
      status: true,
      message: "Farmer created successfully",
      data: farmerData,
      statusCode: 200,
    });
  } catch (err) {
    return errorResponse(res, {
      status: false,
      message: err.message || "Failed to create farmer",
      data: err.message,
      statusCode: 500,
    });
  }
};

module.exports = {
  createFarmer,
};
