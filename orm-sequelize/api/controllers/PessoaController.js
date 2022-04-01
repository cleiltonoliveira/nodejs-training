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
            return res.status(200).json({ message: `id ${id} deleted` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restorePerson(req, res) {
        try {
            const { id } = req.params

            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} restored` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findRegistration(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            const registration = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(registration)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createRegistration(req, res) {
        try {
            const { estudanteId } = req.params
            const registration = { ...req.body, estudante_id: Number(estudanteId) }

            const result = await database.Matriculas.create(registration)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateRegistration(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            const model = req.body

            await database.Matriculas.update(model, { where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })

            const result = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteRegistration(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            await database.Matriculas.destroy({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            return res.status(200).json({ message: `MatriculaId ${matriculaId} deleted` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController