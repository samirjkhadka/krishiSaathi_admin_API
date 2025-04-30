const bcrypt = require("bcryptjs");
const { insert, findAllPending } = require("../models/admin.user.pending");

const createPendingAdminUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const data = {
    ...payload,
    password: hashedPassword,
    action: "create",
  };
  return await insert(data);
};

const getPendingAdminUsers = async () => {
  return await findAllPending();
};

module.exports = {
  createPendingAdminUser,
  getPendingAdminUsers
};
