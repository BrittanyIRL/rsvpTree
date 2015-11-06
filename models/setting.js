'use strict';
module.exports = function(sequelize, DataTypes) {
  var setting = sequelize.define('setting', {
    weddingDate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    time: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    registry: DataTypes.TEXT,
    about: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    picture: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    phone: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    siteName: DataTypes.STRING,
    greeting: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    brideFirst: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    brideLast: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    groomFirst: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    groomLast: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    portalCode: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [7, 8]
      }
    }
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