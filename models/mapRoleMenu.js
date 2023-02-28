const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const MapRoleMenu = sequelize.define(
    "mapRoleMenu",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        roleId: {
            type: DataTypes.UUID,
        },
        menuId: {
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "MapRoleMenu",
        createdAt: false,
        updatedAt: false
    }
);

module.exports = MapRoleMenu;

