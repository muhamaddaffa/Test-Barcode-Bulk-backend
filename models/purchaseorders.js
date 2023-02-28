const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const PurchaseOrders = sequelize.define(
  "purchaseOrders",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    noPurchaseOrder: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Purchase order number already exists'
      }
    },
    productId: { type: DataTypes.STRING, allowNull: false },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    note: { type: DataTypes.STRING, allowNull: false },
    createdBy: { type: DataTypes.UUID },
    updatedBy: { type: DataTypes.UUID }
  },
  {
    tableName: "PurchaseOrders",
  }
);

module.exports = PurchaseOrders;
