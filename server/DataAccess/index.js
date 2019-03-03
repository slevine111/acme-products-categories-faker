const connection = require('./connection')
const { setAssociations } = require('./models/index')

function dbInit(force = false) {
  return connection
    .authenticate()
    .then(() => setAssociations())
    .then(() => connection.sync({ force: force }))
  /* .catch(() => {
      throw new Error('connection failed')
    })*/
}

module.exports = dbInit
