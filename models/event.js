'use strict';
module.exports = function(sequelize, DataTypes) {
  var event = sequelize.define('event', {
    weddingDate: DataTypes.INTEGER,
    location: DataTypes.STRING,
    registry: DataTypes.TEXT,
    about: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    contactEmail: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    siteName: DataTypes.STRING,
    greeting: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.event.hasMany(models.relationship);
        models.event.hasMany(models.guest);
        // associations can be defined here
      }
    }
  });
  return event;
};