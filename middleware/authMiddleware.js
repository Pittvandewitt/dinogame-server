const Player = require('../player/model')
const { toData } = require('../auth/jwt')

function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      Player
        .findByPk(data.id)
        .then(player => {
          if (!player) return next('Player does not exist')

          req.player = player
          next()
        })
        .catch(next)
    }
    catch (error) {
      res.status(400).send(`Error ${error.name}: ${error.message}`)
    }
  }
  else {
    res.status(401).send('Please supply some valid credentials')
  }
}

module.exports = auth