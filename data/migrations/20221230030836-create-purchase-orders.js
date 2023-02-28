'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PurchaseOrders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      noPurchaseOrder: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.STRING
      },
      isApproved: {
        type: Sequelize.BOOLEAN
      },
      note: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.UUID
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PurchaseOrders');
  }
};