const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");

const Bottles = sequelize.define(
  "bottles",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    serial: {
      type: DataTypes.STRING, allowNull: false, unique: {
        args: true,
        msg: 'Serial number already exists'
      }
    },
    batchId: { type: DataTypes.UUID, allowNull: false },
    collieId: { type: DataTypes.UUID },
    bottleNumber: {
      type: DataTypes.STRING, allowNull: false,
    },
    expiredDate: {
      type: DataTypes.DATE, allowNull: false,
    },
    volume: { type: DataTypes.STRING, allowNull: false },
    specialStorageCondition: { type: DataTypes.TEXT, allowNull: false },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    isChecked: { type: DataTypes.BOOLEAN, defaultValue: false },
    note: { type: DataTypes.TEXT },
    qrCode: { type: DataTypes.TEXT },
    createdBy: { type: DataTypes.UUID },
    updatedBy: { type: DataTypes.UUID }
  },
  {
    tableName: "Bottles",
  }
);

module.exports = Bottles;
