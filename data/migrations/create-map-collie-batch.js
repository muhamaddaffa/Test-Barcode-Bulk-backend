'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MapCollieBatch', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      collyId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      batchId: {
        type: Sequelize.UUID,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MapCollieBatch');
  }
};