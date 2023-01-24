"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.belongsTo(models.Authors, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
      });
    }
  }
  Books.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      datePublished: DataTypes.STRING,
      cover: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  return Books;
};
