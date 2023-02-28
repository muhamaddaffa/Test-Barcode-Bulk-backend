'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Collies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      purchaseId: {
        type: Sequelize.UUID
      },
      noCollie: {
        type: Sequelize.INTEGER
      },
      serialShipping: {
        type: Sequelize.STRING
      },
      expiredDate: {
        type: Sequelize.DATE
      },
      shipmentDate: {
        type: Sequelize.DATE
      },
      sscc: {
        type: Sequelize.STRING(50),
        unique: true
      },
      licenseNumber: {
        type: Sequelize.STRING(100)
      },
      isApproved: {
        type: Sequelize.BOOLEAN
      },
      Note: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.UUID
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.UUID
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Collies');
  }
};