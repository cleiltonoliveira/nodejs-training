const Sequelize = require('sequelize')
const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices()

class MatriculaController {
    static async findRegistration(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const result = await matriculasServices
                .findOne({ id: matriculaId, estudante_id: estudanteId })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createRegistration(req, res) {
        const { estudanteId } = req.params
        const model = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const modelresult = await matriculasServices
                .save(model)
            return res.status(200).json(modelresult)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateRegistration(req, res) {
        const { estudanteId, matriculaId } = req.params
        const data = req.body
        try {
            await matriculasServices
                .updateAll(data,
                    { id: Number(matriculaId), estudante_id: Number(estudanteId) })
            return res.status(200).json({ mensagem: `id ${matriculaId} atualizado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteRegistration(req, res) {
        const { matriculaId } = req.params
        try {
            await matriculasServices.delete(Number(matriculaId))
            return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restoreMatricula(req, res) {
        const { matriculaId } = req.params
        try {
            await matriculasServices
                .restore(Number(matriculaId))
            return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findRegistrationsByClass(req, res) {
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await matriculasServices
                .encontraEContaRegistros(
                    { turma_id: Number(turmaId), status: 'confirmado' },
                    { limit: 20, order: [['estudante_id', 'DESC']] })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findFulledClasses(req, res) {
        const maxRegistrationsNumber = 2;
        try {
            const classes = await matriculasServices
                .findAndCountAll({ status: 'confirmado' },
                    {
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

module.exports = MatriculaController