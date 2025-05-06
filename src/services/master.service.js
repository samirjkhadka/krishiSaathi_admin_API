const Master = require("../models/master.model");

const fetchMasterData = async (type, parentId = null) => {

  const masters = await Master.getMastersByType(type, parentId);

  return masters;
};

module.exports = { fetchMasterData };
