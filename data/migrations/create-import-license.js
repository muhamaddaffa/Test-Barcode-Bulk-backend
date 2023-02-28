'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ImportLicense', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false
            },
            registration: {
                type: Sequelize.STRING,
                allowNull: false
            },
            initialdate: {
                type: Sequelize.DATE,
            },
            renewdate: {
                type: Sequelize.DATE,
            },
            expirationdate: {
                type: Sequelize.DATE,
            },
            localpartner: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            internationalpartner: {
                type: Sequelize.STRING,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ImportLicense');
    }
};