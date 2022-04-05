const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices('Pessoas')

class PessoaController {
    static async findAllActive(req, res) {
        try {
            const result = await pessoasServices.findAllActive()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findAll(req, res) {
        try {
            const result = await pessoasServices.findAll()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params
            const result = await pessoasServices.findById(id)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async save(req, res) {
        try {
            const model = req.body

            const result = await pessoasServices.save(model)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const model = req.body

            await pessoasServices.update(model, Number(id), {})

            const result = await pessoasServices.findById(id)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params

            await pessoasServices.delete(id)
            return res.status(200).json({ message: `id ${id} deleted` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restorePerson(req, res) {
        try {
            const { id } = req.params

            await pessoasServices.restore(id)
            return res.status(200).json({ message: `id ${id} restored` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async findRegistrations(req, res) {
        const { estudanteId } = req.params
        try {
            const registrations = await pessoasServices
                .findRegistrationsByStudent({ id: Number(estudanteId) })
            return res.status(200).json(registrations)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async blockPerson(req, res) {
        try {
            const { estudanteId } = req.params
            await pessoasServices.blockPersonAndRegistration(Number(estudanteId))
            return res.status(200).json({ message: 'Success' })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController