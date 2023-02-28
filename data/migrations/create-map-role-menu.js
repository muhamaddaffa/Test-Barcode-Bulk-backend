'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MapRoleMenu', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      menuId: {
        type: Sequelize.UUID,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MapRoleMenu');
  }
};