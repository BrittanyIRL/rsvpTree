'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weddingDate: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      registry: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.TEXT
      },
      contactEmail: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.INTEGER
      },
      siteName: {
        type: Sequelize.STRING
      },
      greeting: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('events');
  }
};