'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.STRING(20)
      },
      newNIK: {
        type: Sequelize.STRING(10)
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      positionName: {
        type: Sequelize.STRING
      },
      positionId: {
        type: Sequelize.STRING(10)
      },
      organizationId: {
        type: Sequelize.STRING(10)
      },
      unitName: {
        type: Sequelize.STRING
      },
      unitCode: {
        type: Sequelize.STRING(10)
      },
      roleName: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.STRING
      },
      roleIdApp: {
        type: Sequelize.UUID
      },
      registerDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Users');
  }
};