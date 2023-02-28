'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      allowCreatePO: {
        type: Sequelize.BOOLEAN,
      },
      allowUpdatePO: {
        type: Sequelize.BOOLEAN,
      },
      allowDeletePO: {
        type: Sequelize.BOOLEAN,
      },
      allowCreateBatch: {
        type: Sequelize.BOOLEAN,
      },
      allowUpdateBatch: {
        type: Sequelize.BOOLEAN,
      },
      allowDeleteBatch: {
        type: Sequelize.BOOLEAN,
      },
      allowCreateBottle: {
        type: Sequelize.BOOLEAN,
      },
      allowUpdateBottle: {
        type: Sequelize.BOOLEAN,
      },
      allowDeleteBottle: {
        type: Sequelize.BOOLEAN,
      },
      allowCreateCollie: {
        type: Sequelize.BOOLEAN,
      },
      allowUpdateCollie: {
        type: Sequelize.BOOLEAN,
      },
      allowUpdateCollieBottle: {
        type: Sequelize.BOOLEAN,
      },
      allowDeleteCollie: {
        type: Sequelize.BOOLEAN,
      },
      allowDownloadLabelCollie: {
        type: Sequelize.BOOLEAN,
      },
      allowDownloadLabelBottle: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permissions');
  }
};