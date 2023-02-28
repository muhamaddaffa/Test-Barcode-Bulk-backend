const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const Permissions = sequelize.define(
  "permissions",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    roleId: { type: DataTypes.UUID },
    allowCreatePO: {
      type: DataTypes.BOOLEAN,
    },
    allowUpdatePO: {
      type: DataTypes.BOOLEAN,
    },
    allowDeletePO: {
      type: DataTypes.BOOLEAN,
    },
    allowCreateBatch: {
      type: DataTypes.BOOLEAN,
    },
    allowUpdateBatch: {
      type: DataTypes.BOOLEAN,
    },
    allowDeleteBatch: {
      type: DataTypes.BOOLEAN,
    },
    allowCreateBottle: {
      type: DataTypes.BOOLEAN,
    },
    allowUpdateBottle: {
      type: DataTypes.BOOLEAN,
    },
    allowDeleteBottle: {
      type: DataTypes.BOOLEAN,
    },
    allowCreateCollie: {
      type: DataTypes.BOOLEAN,
    },
    allowUpdateCollie: {
      type: DataTypes.BOOLEAN,
    },
    allowUpdateCollieBottle: {
      type: DataTypes.BOOLEAN,
    },
    allowDeleteCollie: {
      type: DataTypes.BOOLEAN,
    },
    allowDownloadLabelCollie: {
      type: DataTypes.BOOLEAN,
    },
    allowDownloadLabelBottle: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "Permissions",
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Permissions;

