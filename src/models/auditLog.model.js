const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  action: {
    type: String,
    required: true,
  },
  details: { type: Object },
  ipAddress: { type: String },
  platform: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
