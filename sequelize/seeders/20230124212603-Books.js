"use strict";

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert("Books", [
      {
        title: "The Night and Its Moon",
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Sun and Its Shade",
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Gloom Between Stars",
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
