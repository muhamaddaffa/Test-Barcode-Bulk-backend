const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: { type: DataTypes.STRING, unique: { args: true, msg: 'user has been registered' } },
    newNIK: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: { args: true, msg: 'user has been registered' } },
    username: { type: DataTypes.STRING, unique: { args: true, msg: 'user has been registered' } },
    positionName: { type: DataTypes.STRING },
    positionId: { type: DataTypes.STRING },
    organizationId: { type: DataTypes.STRING },
    unitName: { type: DataTypes.STRING },
    unitCode: { type: DataTypes.STRING },
    roleName: { type: DataTypes.STRING },
    roleId: { type: DataTypes.STRING },
    roleIdApp: { type: DataTypes.UUID, allowNull: false },
    registerDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  {
    tableName: "Users",
  }
);

module.exports = Users;

