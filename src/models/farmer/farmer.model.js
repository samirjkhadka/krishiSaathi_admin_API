const db = require("../../config/postgres");

const createFarmer = async (farmerData) => {

  const query = `
    INSERT INTO farmers
(full_name, dob_english, dob_nepali, permanent_province, permanent_district, permanent_municipality, permanent_street,
 permanent_ward_no, temporary_province, temporary_district, temporary_municipality, temporary_street, temporary_ward_no,
 identification_type, identification_number, identification_issued_date, identification_expiry_date, identification_issued_district, pan_number,
 phone, email, is_active, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, NOW(), NOW())
RETURNING *;
  `;
  const values = [
    farmerData.full_name,
    farmerData.dob_english.toISOString(),
    farmerData.dob_nepali,
    farmerData.permanent_province,
    farmerData.permanent_district,
    farmerData.permanent_municipality,
    farmerData.permanent_street,
    farmerData.permanent_ward_no,
    farmerData.temporary_province,
    farmerData.temporary_district,
    farmerData.temporary_municipality,
    farmerData.temporary_street,
    farmerData.temporary_ward_no,
    farmerData.identification_type,
    farmerData.identification_number,
    farmerData.identification_issued_date.toISOString(),
    farmerData.identification_expiry_date.toISOString(),
    farmerData.identification_issued_district,
    farmerData.pan_number,
    farmerData.phone,
    farmerData.email,
    true,
  ];

  const result = await db.query(query, values);


  if (!result || !result.rows || result.rows.length === 0) {
    console.log("==> No rows returned!");
    throw new Error("Failed to insert farmer data");
  }

  return result.rows[0];
};

module.exports = {
  createFarmer,
};
