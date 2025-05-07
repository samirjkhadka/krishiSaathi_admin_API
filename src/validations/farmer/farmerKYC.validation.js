const Joi = require("joi");

const farmerKycValidation = Joi.object({
  full_name: Joi.string().min(3).max(100).required(),
  dob_english: Joi.date().required(),
  dob_nepali: Joi.string().required(),
  permanent_province: Joi.string().required(),
  permanent_district: Joi.string().required(),
  permanent_municipality: Joi.string().required(),
  permanent_street: Joi.string().allow(""),
  permanent_ward_no: Joi.string().required(),
  permanent_address: Joi.string().required(),
  temporary_province: Joi.string().allow(""),
  temporary_district: Joi.string().allow(""),
  temporary_municipality: Joi.string().allow(""),
  temporary_street: Joi.string().allow(""),
  temporary_ward_no: Joi.string().allow(""),
  identification_type: Joi.string()
    .valid("Citizenship", "Passport", "Driving License")
    .required(),
  identification_number: Joi.string().required(),
  identification_issued_date: Joi.date().required(),
  identification_expiry_date: Joi.date().allow(null),
  identification_issued_district: Joi.string().required(),
  pan_number: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = farmerKycValidation;
