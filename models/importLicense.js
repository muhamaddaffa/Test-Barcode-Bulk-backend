const { sequelize } = require('../helpers/conection')
const DataTypes = require("sequelize");


const ImportLicenses = sequelize.define(
    "importLicense",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER,
        },
        country: { type: DataTypes.STRING },
        product: { type: DataTypes.STRING },
        registration: { type: DataTypes.STRING },
        internationalpartner: { type: DataTypes.STRING },
        localpartner: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        initialdate: { type: DataTypes.DATE },
        renewdate: { type: DataTypes.DATE },
        expirationdate: { type: DataTypes.DATE }
    },
    {
        tableName: "ImportLicense",
        createdAt: false,
        updatedAt: false
    }
);

module.exports = ImportLicenses;
