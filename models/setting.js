'use strict';
module.exports = function(sequelize, DataTypes) {
  var setting = sequelize.define('setting', {
    weddingDate: DataTypes.INTEGER,
    location: DataTypes.STRING,
    time: DataTypes.STRING,
    registry: DataTypes.TEXT,
    about: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    siteName: DataTypes.STRING,
    greeting: DataTypes.STRING,
    brideFirst: DataTypes.STRING,
    brideLast: DataTypes.STRING,
    groomFirst: DataTypes.STRING,
    groomLast: DataTypes.STRING,
    portalCode: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.setting.hasMany(models.guest)
        models.setting.hasMany(models.user)
        models.setting.hasMany(models.tree)
      }
    }
  });
  return setting;
};