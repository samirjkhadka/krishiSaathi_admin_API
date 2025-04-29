const bcryt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const {
  findUserByUsername,
  updateUserTwoFactor,
  findUserById,
} = require("../models/user.model");
const { comparePassword } = require("../utils/encryption");
const { generateToken } = require("../utils/jwt");
const { saveAuditLog } = require("./auditLog.service");

// login
const login = async (username, password) => {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await comparePassword(password, user.password_hash);
  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  //if 2FA enabled, generate 2FA secret
  const token = generateToken({ id: user.id, username: user.username });
  console.log("user.id value and type: ", user.id, typeof user.id);
  await saveAuditLog({
    userId: user.id,
    action: "LOGIN_SUCCESS",
    details: { username: user.username },
    ipAddress: "127.0.0.1",
    platform: "web",
  });
  return { token, user };
};

// 2FA Setup Service
const generate2FASecret = async (userId) => {
  const secret = speakeasy.generateSecret({
    length: 20,
    name: "Krishi Saathi",
    issuer: "Krishi Saathi",
  });

const otpauthUrl = secret.otpauth_url;

const qrImageUrl = await qrcode.toDataURL(otpauthUrl);

  await updateUserTwoFactor(userId, true, secret.base32);
  return {
    otpauthUrl,
    base: secret.base32,
    qrImageUrl
  };
};

// 2FA Verify
const verify2FAToken = async (userId, token) => {
  const user = await findUserById(userId);

  if (!user || !user.two_fa_secret) {
    throw new Error("User not found");
  }

  const verified = speakeasy.totp.verify({
    secret: user.two_fa_secret,
    encoding: "base32",
    token,
    window: 1,
  });
  return verified;
};

//Forgot password
const forgotPassword = async (username) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
};

module.exports = {
  login,
  generate2FASecret,
  verify2FAToken,
  forgotPassword,
};
