const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const Collies = sequelize.define(
  "collies",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    purchaseId: { type: DataTypes.UUID, allowNull: false },
    noCollie: { type: DataTypes.INTEGER, allowNull: false },
    serialShipping: { type: DataTypes.STRING },
    expiredDate: { type: DataTypes.DATE, allowNull: false },
    shipmentDate: { type: DataTypes.DATE, allowNull: false },
    sscc: {
      type: DataTypes.STRING, unique: {
        args: true,
        msg: 'SSCC number already exists'
      }
    },
    licenseNumber: { type: DataTypes.STRING },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    Note: { type: DataTypes.TEXT },
    createdBy: { type: DataTypes.UUID, allowNull: true },
    updatedBy: { type: DataTypes.UUID, allowNull: true },
  },
  {
    tableName: "Collies",
  }
);

module.exports = Collies;
