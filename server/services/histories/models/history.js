"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      player: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "player cannot empty",
          },
        },
      },
      opponent: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "opponent cannot empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "status cannot empty",
          },
        },
      },
      score: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "score cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
