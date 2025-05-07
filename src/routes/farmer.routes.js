const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/fileUpload");
const { createFarmer } = require("../controllers/farmer/farmer.controller");

router.post(
  "/create",
  authenticateJWT,
  upload.fields([
    { name: "document_front_image", maxCount: 1 },
    { name: "document_back_image", maxCount: 1 },
    { name: "passport_photo", maxCount: 1 },
    { name: "pan_image", maxCount: 1 },
  ]),
  createFarmer
);

module.exports = router;
