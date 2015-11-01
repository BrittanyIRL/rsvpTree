'use strict';
module.exports = function(sequelize, DataTypes) {
  var guest = sequelize.define('guest', {
    portalCode: DataTypes.INTEGER,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    party: DataTypes.STRING,
    rsvp: DataTypes.BOOLEAN,
    count: DataTypes.INTEGER,
    childName: DataTypes.TEXT,
    childAge: DataTypes.STRING,
    diet: DataTypes.TEXT,
    note: DataTypes.TEXT,
    plusOneLastName: DataTypes.STRING,
    plusOneFirstName: DataTypes.STRING,
    plusOne: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.guest.belongsTo(models.setting)
        models.guest.belongsToMany(models.tree, {through: "guestsTrees"})
      }
    }
  });
  return guest;
};