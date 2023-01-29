"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.belongsTo(models.Authors, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
      });
      Events.belongsToMany(models.Readers, {
        through: "Reader_Events",
      });
    }
  }
  Events.init(
    {
      eventTitle: DataTypes.STRING,
      date: DataTypes.STRING,
      location: DataTypes.STRING,
      time: DataTypes.STRING,
      isFree: DataTypes.STRING,
      description: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
