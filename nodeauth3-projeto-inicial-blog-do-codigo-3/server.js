require('dotenv').config()

const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const app = require('./app')
const port = 3000
require('./database')
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')

const routes = require('./rotas')
const { InvalidArgumentError } = require('./src/erros')
routes(app)

app.use((error, req, res, next) => {
    let status = 500
    const corpo = { mensagem: error.message }

    if (error instanceof InvalidArgumentError) {
        status = 400
    } else if (error instanceof JsonWebTokenError) {
        status = 401
    } else if (error instanceof TokenExpiredError) {
        status = 401
        corpo.expiradoEm = error.expiredAt
    } else if (error instanceof NotFoundError) {
        status = 404
    } else if (error instanceof UnauthorizedError) {
        status = 401
    }

    resposta.status(status).json(corpo)
})

app.listen(port, () => console.log('A API está funcionando!'))
