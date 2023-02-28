const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const Roles = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  {
    tableName: "Roles",
  }
);

module.exports = Roles;

