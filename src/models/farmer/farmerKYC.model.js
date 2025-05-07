const db = require("../../config/postgres");

const createFarmerKyc = async (kycData) => {
  const query = `
    INSERT INTO farmer_kyc_documents 
    (farmer_id,  
    identification_front_image, identification_back_image, passport_size_image, pan_image, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
    RETURNING *;
  `;
  const values = [
    kycData.farmer_id,
    kycData.document_front_image,
    kycData.document_back_image,
    kycData.passport_photo,
    kycData.pan_image,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};

module.exports = {
  createFarmerKyc,
};
