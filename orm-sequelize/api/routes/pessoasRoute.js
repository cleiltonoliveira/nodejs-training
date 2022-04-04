const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.findAllActive)
router.get('/pessoas/all', PessoaController.findAll)
router.get('/pessoas/:id', PessoaController.findById)
router.post('/pessoas/', PessoaController.save)
router.put('/pessoas/:id', PessoaController.update)
router.delete('/pessoas/:id', PessoaController.delete)
router.post('/pessoas/:id/restore', PessoaController.restorePerson)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.findRegistration)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.updateRegistration)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteRegistration)
router.post('/pessoas/:estudanteId/matricula', PessoaController.createRegistration)

module.exports = router