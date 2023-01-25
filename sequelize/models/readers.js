"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Readers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Readers.belongsToMany(models.Events, {
        through: "Reader_Events",
      });
    }
  }
  Readers.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      funFact: DataTypes.STRING,
      favAuths: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Readers",
    }
  );
  return Readers;
};
