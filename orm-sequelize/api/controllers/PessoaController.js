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

    static async findById(req, res) {
        try {
            const { id } = req.params
            const result = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async save(req, res) {
        try {
            const model = req.body

            const result = await database.Pessoas.create(model)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const model = req.body

            await database.Pessoas.update(model, { where: { id: Number(id) } })

            const result = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params

            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({message: `id ${id} deleted`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController