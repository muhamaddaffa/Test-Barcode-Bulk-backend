'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bottles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      batchId: {
        type: Sequelize.UUID
      },
      collieId: {
        type: Sequelize.UUID
      },
      serial: {
        type: Sequelize.STRING,
        unique: true
      },
      bottleNumber: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.STRING
      },
      specialStorageCondition: {
        type: Sequelize.TEXT
      },
      expiredDate: {
        type: Sequelize.DATE
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isChecked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      note: {
        type: Sequelize.TEXT
      },
      qrCode: {
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
    await queryInterface.dropTable('Bottles');
  }
};