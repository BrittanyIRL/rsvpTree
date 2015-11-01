'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('settings', {
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
      time: {
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
      phone: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      siteName: {
        type: Sequelize.STRING
      },
      greeting: {
        type: Sequelize.STRING
      },
      brideFirst: {
        type: Sequelize.STRING
      },
      brideLast: {
        type: Sequelize.STRING
      },
      groomFirst: {
        type: Sequelize.STRING
      },
      groomLast: {
        type: Sequelize.STRING
      },
      portalCode: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('settings');
  }
};