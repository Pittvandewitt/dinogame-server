const app = require('./server')
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonParser = bodyParser.json()
const db = require('./db')

db.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch(console.error)

app.use(cors())
app.use(jsonParser)

const scoreRouter = require('./score/router')
const playerRouter = require('./player/router')

app.use(scoreRouter)
app.use(playerRouter)