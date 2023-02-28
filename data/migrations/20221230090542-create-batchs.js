'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Batchs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      purchaseId: {
        type: Sequelize.UUID
      },
      collieId: {
        type: Sequelize.UUID
      },
      batchNumber: {
        type: Sequelize.STRING(100),
        unique: true
      },
      batchSize: {
        type: Sequelize.STRING
      },
      nameAPI: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      dateManufacturing: {
        type: Sequelize.DATE
      },
      importLicense: {
        type: Sequelize.STRING(100)
      },
      manufacturingLicense: {
        type: Sequelize.STRING(100)
      },
      specialStorageCondition: {
        type: Sequelize.STRING(100)
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      note: {
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
    await queryInterface.dropTable('Batchs');
  }
};