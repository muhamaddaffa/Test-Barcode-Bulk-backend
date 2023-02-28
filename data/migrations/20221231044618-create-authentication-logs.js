'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuthenticationLogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID
      },
      user: {
        type: Sequelize.JSONB
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('login', 'logout')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AuthenticationLogs');
  }
};