class InvalidArgumentError extends Error {
  constructor(mensagem) {
    super(mensagem)
    this.name = 'InvalidArgumentError'
  }
}

class InternalServerError extends Error {
  constructor(mensagem) {
    super(mensagem)
    this.name = 'InternalServerError'
  }
}

class NotFoundError extends Error {
  constructor(entity) {
    const mensagem = `Não foi possível encontrar ${entity}`
    super(mensagem)
    this.name = 'NotFoundError'
  }
}

class UnauthorizedError extends Error {
  constructor() {
    const mensagem = 'Não foi possível acessar esse recurso'
    super(mensagem)
    this.name = 'UnauthorizedError'
  }
}

module.exports = { InvalidArgumentError, InternalServerError, NotFoundError, UnauthorizedError }
