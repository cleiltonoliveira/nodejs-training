const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    async findAllActive(where = {}) {
        return database[this.modelName].findAll({ where: { ...where } })
    }

    async findAll(where = {}) {
        return database[this.modelName].scope('todos').findAll({ where: { ...where } })
    }

    async blockPersonAndRegistration(estudanteId) {
        return database.sequelize.transaction(async transaction => {
            await super.update({ ativo: false }, estudanteId, { transaction: transaction })
            await super.updateAll({ status: 'cancelado' }, { estudante_id: Number(estudanteId) }, { transaction: transaction })
        })
    }

    async findRegistrationsByStudent(where = {}) {
        const person = await database[this.nomeDoModelo]
            .findOne({ where: { ...where } })
        return person.getAulasMatriculadas()
    }
} module.exports = PessoasServices