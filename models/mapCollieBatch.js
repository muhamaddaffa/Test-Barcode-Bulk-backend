const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const MapCollieBatch = sequelize.define(
    "map",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        collyId: {
            type: DataTypes.UUID,
        },
        batchId: {
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "MapCollieBatch",
        createdAt: false,
        updatedAt: false
    }
);

module.exports = MapCollieBatch;

