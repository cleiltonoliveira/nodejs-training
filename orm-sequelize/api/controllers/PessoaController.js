const database = require('../models')

class PessoaController {
    static async findAll(req, res) {
        try {
            const result = await database.Pessoas.findAll()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController