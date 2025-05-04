const {
  insertPermission,
  findAllPermissions,
} = require("../../models/rbac/permissions.model");

const standardActions = [
  "create",
  "view",
  "update",
  "delete",
  "approve",
  "reject",
];

const features = [
  "User Management",
  "Transaction Report",
  "Roles & Permissions",
  "Audit Logs",
];

const seedPermissions = async () => {
  for (const feature of features) {
    for (const action of standardActions) {
      const name = `${feature.toLowerCase().replace(/ /g, "_")}_${action}`;
      const description = `${action.toUpperCase()} permission for ${feature}`;
      await insertPermission(name, description);
    }
  }
  return { message: "Permissions seeded successfully" };
};

const getPermissions = async () => {
  return await findAllPermissions();
};

module.exports = {
  seedPermissions,
  getPermissions,
};
