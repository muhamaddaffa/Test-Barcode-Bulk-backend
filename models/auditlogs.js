const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const AuditLogs = sequelize.define(
  "auditLogs",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: { type: DataTypes.UUID },
    user: { type: DataTypes.JSONB },
    ipAddress: { type: DataTypes.STRING },
    operation: { type: DataTypes.ENUM('insert', 'update', 'delete') },
    modelData: { type: DataTypes.STRING },
    previousValue: { type: DataTypes.JSONB },
    newValue: { type: DataTypes.JSONB },
  },
  {
    tableName: "AuditLogs",
    updatedAt: false
  }
);

module.exports = AuditLogs;
