const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const AuthenticationLogs = sequelize.define(
  "authenticationLogs",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: { type: DataTypes.UUID },
    user: { type: DataTypes.JSONB },
    ipAddress: { type: DataTypes.STRING },
    type: { type: DataTypes.ENUM('login', 'logout') }
  },
  {
    tableName: "AuthenticationLogs",
  }
);

module.exports = AuthenticationLogs;
