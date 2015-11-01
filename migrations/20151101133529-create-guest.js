'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portalCode: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      party: {
        type: Sequelize.STRING
      },
      rsvp: {
        type: Sequelize.BOOLEAN
      },
      count: {
        type: Sequelize.INTEGER
      },
      childName: {
        type: Sequelize.TEXT
      },
      childAge: {
        type: Sequelize.STRING
      },
      diet: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      plusOneLastName: {
        type: Sequelize.STRING
      },
      plusOneFirstName: {
        type: Sequelize.STRING
      },
      plusOne: {
        type: Sequelize.BOOLEAN
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('guests');
  }
};