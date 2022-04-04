const database = require('../models')
const Sequelize = require('sequelize')

class PessoaController {
    static async findAllActive(req, res) {
        try {
            const result = await database.Pessoas.findAll()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findAll(req, res) {
        try {
            const result = await database.Pessoas.scope('todos').findAll()
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

    static async findRegistrations(req, res) {
        try {
            const { estudanteId } = req.params
            const person = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            const registrations = await person.getAulasMatriculadas()
            return res.status(200).json(registrations)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findRegistrationsByClass(req, res) {
        try {
            const { turmaId } = req.params

            const registrations = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
            })
            return res.status(200).json(registrations)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findFulledClasses(req, res) {
        try {
            const maxRegistrationsNumber = 2;

            const classes = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${maxRegistrationsNumber}`)
            })
            return res.status(200).json(classes.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController