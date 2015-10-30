'use strict';
module.exports = function(sequelize, DataTypes) {
  var admin = sequelize.define('admin', {
    oauth: DataTypes.TEXT,
    portalCodeMaster: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.admin.hasMany(models.relationship);
 // associations can be defined here
      }
    }
  });
  return admin;
};