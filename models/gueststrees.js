'use strict';
module.exports = function(sequelize, DataTypes) {
  var guestsTrees = sequelize.define('guestsTrees', {
    guestId: DataTypes.INTEGER,
    treeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return guestsTrees;
};