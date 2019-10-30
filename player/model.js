const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('players', {
  nickname: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  }
})

module.exports = Player