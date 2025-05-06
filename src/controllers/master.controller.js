const { fetchMasterData } = require("../services/master.service");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

const getMasters = async (req, res) => {
  try {
    const type = req.params.type;
    const parentId = req.query.parent_id || null;
    const result = await fetchMasterData(type, parentId);


    return successResponse(res, {
      status: true,
      message: "Master data fetched successfully",
      data: result,
      statusCode: 200,
    });
  } catch (err) {
    return errorResponse(res, {
      status: false,
      message: "Failed to fetch master data",
      data: err,
      statusCode: 500,
    });
  }
};

module.exports = {
  getMasters,
};
