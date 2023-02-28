const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const Menus = sequelize.define(
  "menus",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING },
    path: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING },
    exact: { type: DataTypes.BOOLEAN },
    sort: { type: DataTypes.INTEGER }
  },
  {
    tableName: "Menus",
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Menus;

