"use strict";

const { now } = require("sequelize/types/utils");

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
    await queryInterface.bulkInsert("Authors", [
      {
        email: "email1@email.com",
        password: "password",
        firstName: "Piper",
        lastName: "CJ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "email2@email.com",
        password: "password",
        firstName: "Jeanette",
        lastName: "McCardy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "email3@email.com",
        password: "password",
        firstName: "Imaginary",
        lastName: "Friend",
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
