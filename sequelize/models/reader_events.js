'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reader_Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reader_Events.init({
    readerID: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reader_Events',
  });
  return Reader_Events;
};