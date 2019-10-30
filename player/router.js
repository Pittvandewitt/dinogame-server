const { Router } = require('express');
const bcrypt = require('bcrypt');
const Player = require('./model');
const { toJWT } = require('../auth/jwt');
const router = new Router();

router.post('/player', async (req, res, next) => {
  const { nickname, password } = req.body
  const player = await Player.findOne(
    { where: { nickname } }
  ).catch(next) || await Player.create(
    { ...req.body, password: bcrypt.hashSync(password, 10) }
  ).catch(next)

  if (bcrypt.compareSync(password, player.password)) {
    res.status(200).send({
      jwt: toJWT({ id: player.id }),
      id: player.id,
      nickname: player.nickname
    })
  } else {
    res.status(401).send('Enter correct password')
  }
})

module.exports = router