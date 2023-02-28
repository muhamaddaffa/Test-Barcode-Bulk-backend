const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");
const Bottles = require("./bottles")


const Batchs = sequelize.define(
  "batchs",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    purchaseId: { type: DataTypes.UUID, allowNull: false },
    collieId: { type: DataTypes.UUID },
    batchNumber: {
      type: DataTypes.STRING, allowNull: false, unique: {
        args: true,
        msg: 'Batch number already exists'
      }
    },
    batchSize: { type: DataTypes.STRING },
    nameAPI: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    dateManufacturing: { type: DataTypes.DATE, allowNull: false },
    importLicense: { type: DataTypes.STRING, allowNull: false },
    manufacturingLicense: { type: DataTypes.STRING, allowNull: false },
    specialStorageCondition: { type: DataTypes.STRING, allowNull: false },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    note: { type: DataTypes.TEXT },
    createdBy: { type: DataTypes.UUID, allowNull: true },
    updatedBy: { type: DataTypes.UUID, allowNull: true },
  },
  {
    tableName: "Batchs",
  }
);

Batchs.hasMany(Bottles, { foreignKey: 'batchId' })

module.exports = Batchs;
