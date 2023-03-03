"use strict";

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          // firstName: "John",
          // lastName: "Doe",
          id: uuidv4(),
          name: "John Doe",
          email: "johndoe@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // firstName: "John",
          // lastName: "Chena",
          id: uuidv4(),
          name: "John Chena",
          email: "johnchena@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
