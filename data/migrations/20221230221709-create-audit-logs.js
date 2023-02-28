'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditLogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      user: {
        type: Sequelize.JSONB
      },
      ipAddress: {
        type: Sequelize.STRING(25)
      },
      operation: {
        type: Sequelize.ENUM('insert', 'update', 'delete')
      },
      modelData: {
        type: Sequelize.STRING(50)
      },
      previousValue: {
        type: Sequelize.JSONB
      },
      newValue: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AuditLogs');
  }
};