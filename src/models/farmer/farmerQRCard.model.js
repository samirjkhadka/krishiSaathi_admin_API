const db = require("../../config/postgres");

const createFarmerQRCard = async (cardData) => {
  const query = `INSERT INTO farmer_qr_cards (farmer_id,qr_code_image, qr_card_number,is_active,  created_at, updated_at) 
  VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`;
  const values = [
    cardData.farmer_id,
    cardData.qr_code,
    cardData.qr_card_number,
    true,
  ];
  const response = await db.query(query, values);

  return response.rows[0];
};

module.exports = { createFarmerQRCard };
