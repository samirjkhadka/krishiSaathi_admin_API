const bcrypt = require("bcryptjs");
const {
  insert,
  findAllPending,
  approvePendingUser,
  rejectPendingUser,
  updateRejectedPendingUser,
} = require("../models/admin.user.pending");
const logAction = require("../utils/maker_checker_logger");

const createPendingAdminUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const data = {
    ...payload,
    password: hashedPassword,
    action: "create",
  };
  return await insert(data);
};

const getPendingAdminUsers = async ({ page, limit, search }) => {
  console.log(page, limit, search);
  return await findAllPending({ page, limit, search });
};

const approvePendingAdminUser = async (id, approverId) => {
  const result = await approvePendingUser(id, approverId);

  //logging the approval of admin user to be done
  // await logAction(approverId, "Approved", { userId: id });

  return result;
};

const rejectPendingAdminUser = async (id, rejecterId, remarks) => {
  const result = await rejectPendingUser(id, rejecterId, remarks);

  //logging the rejection of admin user to be done
  // await logAction(rejecterId, "Rejected", { userId: id, remarks });

  return result;
};

const editAndResubmitPendingUser = async (id, updatedData) => {
  const updatedUser = await updateRejectedPendingUser(id, updatedData);
  if (!updatedUser) {
    throw new Error("Update Failed or user is not rejected");
  }
  return updatedUser;
};

module.exports = {
  createPendingAdminUser,
  getPendingAdminUsers,
  approvePendingAdminUser,
  rejectPendingAdminUser,
  editAndResubmitPendingUser
};
