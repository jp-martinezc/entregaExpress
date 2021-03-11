const { Sequelize, DataTypes, Model } = require('sequelize');

const db = require('../config/database');
const sequelize = new Sequelize('sqlite::memory');

class Message extends Model {}
  Message.init({
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    ts: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    }
  },
    { // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Message' // We need to choose the model name
  });
  Message.sync();
  
module.exports = Message;