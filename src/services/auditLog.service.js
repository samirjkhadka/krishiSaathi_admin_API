const AuditLog = require("../models/auditLog.model");

const saveAuditLog = async ({userId, action, details, ipAddress, platform}) => {
  const auditLog = new AuditLog({
    userId,
    action,
    details,
    ipAddress,
    platform,
  });
  await auditLog.save();
};

module.exports = { saveAuditLog };
