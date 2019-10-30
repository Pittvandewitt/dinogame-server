const { Router } = require('express');
const Score = require('./model');
const Player = require('../player/model')
const auth = require('../middleware/authMiddleware')
const Sse = require('json-sse')
const { Op } = require('sequelize')
const stream = new Sse()
const router = new Router();

router.post('/score', auth, async (req, res, next) => {
  if (req.player.id !== req.body.playerId) {
    return res.status(401).send('Unauthorized')
  }
  const postedScore = await Score.create(req.body)
    .catch(next)
  if (postedScore) {
    res.status(200).send('Post success')
  } else {
    res.status(500).send('Something went wrong posting the score')
  }
  const scores = await getScores(next)
  stream.send(scores)
})

router.get('/score', async (req, res, next) => {
  const scores = await getScores(next)
  res.status(200).send(scores)
})

router.get('/stream', async (req, res, next) => {
  const scores = await getScores(next)
  const data = JSON.stringify(scores)

  stream.updateInit(data)
  stream.init(req, res)
  res.status(200)
})

getScores = async (next) => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return await Score.findAll({
    limit: 5,
    order: [['score', 'DESC']],
    attributes: ['id', 'score'],
    include: [{
      model: Player,
      as: 'player',
      attributes: ['nickname']
    }],
    where: {
      createdAt: {
        [Op.gte]: new Date(date)
      }
    }
  })
    .catch(next)
}

module.exports = router