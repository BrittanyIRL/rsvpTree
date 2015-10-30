'use strict';
module.exports = function(sequelize, DataTypes) {
  var guest = sequelize.define('guest', {
    portalCode: DataTypes.INTEGER,
    email: DataTypes.TEXT,
    name: DataTypes.STRING,
    party: DataTypes.STRING,
    rsvp: DataTypes.BOOLEAN,
    count: DataTypes.INTEGER,
    children: DataTypes.INTEGER,
    childAge: DataTypes.INTEGER,
    dietaryRestriction: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        
 // associations can be defined here
      }
    }
  });
  return guest;
};