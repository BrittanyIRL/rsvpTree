'use strict';
module.exports = function(sequelize, DataTypes) {
  var tree = sequelize.define('tree', {
    relationship: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tree.belongsToMany(models.guest, {through: "guestsTrees"})
        models.tree.belongsTo(models.setting)
      }
    }
  });
  return tree;
};