const Sequelize = require('sequelize');
const db = require('../db');
const Player = require('../player/model')

const Score = db.define('scores', {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  }
})

Score.belongsTo(Player)

module.exports = Score