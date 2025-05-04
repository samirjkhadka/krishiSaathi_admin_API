const bcryt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const {
  findUserByUsername,
  updateUserTwoFactor,
  findUserById,
  updateUserResetToken,
} = require("../models/user.model");
const { comparePassword } = require("../utils/encryption");
const { generateToken } = require("../utils/jwt");
const { saveAuditLog } = require("./auditLog.service");
const { generateOTP, generateTokenExpiry } = require("../utils/generateOTP");
const { sendMail } = require("../utils/mailer");
const crypto = require("crypto");

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
  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role,
    role_id: user.role_id,
    email: user.email,
  });

  await saveAuditLog({
    userId: user.id,
    action: "LOGIN_SUCCESS",
    details: { username: user.username },
    ipAddress: "127.0.0.1",
    platform: "web",
  });

  const shouldSetup2FA = !user.is_2fa_enabled && !user.two_fa_secret === true;

  if (shouldSetup2FA) {
    return {
      token: null,
      user: {
        id: user.id,
        username: user.username,
        requires_2fa_setup: true,
      },
    };
  }

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
    qrImageUrl,
  };
};

// 2FA Verify
const verify2FAToken = async (userId, token) => {
  const user = await findUserById(userId);

  if (!user || !user.two_fa_secret) {
    throw new Error("2FA not setup");
  }

  const verified = speakeasy.totp.verify({
    secret: user.two_fa_secret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    throw new Error("Invalid 2FA Token");
  }

  await updateUserTwoFactor(user.id, true);
  return true;
};

//Forgot password
const forgotPassword = async (username) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = generateTokenExpiry();

  await updateUserResetToken(user.id, token, tokenExpiry);

  const resetLink = `https://www.neemohlabs.com.np/reset-password?token=${token}`;

  await sendMail({
    to: user.email,
    subject: "Reset Password Link",
    html: `
    <p>Click on the link below to reset your password:</p>
    <p><a href="${resetLink}">${resetLink}</a></p>
  `,
  });
};

module.exports = {
  login,
  generate2FASecret,
  verify2FAToken,
  forgotPassword,
};
