const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateTokenExpiry = () => {
  return new Date(Date.now() + 60 * 60 * 1000);
};

module.exports = { generateOTP, generateTokenExpiry };
