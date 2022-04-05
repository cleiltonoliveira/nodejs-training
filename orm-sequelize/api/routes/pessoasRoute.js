const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

router.get('/pessoas/active', PessoaController.findAllActive)
router.get('/pessoas', PessoaController.findAll)
router.get('/pessoas/:id', PessoaController.findById)
router.post('/pessoas/', PessoaController.save)
router.put('/pessoas/:id', PessoaController.update)
router.delete('/pessoas/:id', PessoaController.delete)
router.post('/pessoas/:id/restore', PessoaController.restorePerson)
router.get('/pessoas/:estudanteId/matricula', PessoaController.findRegistrations)
router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.findRegistrationsByClass)
router.get('/pessoas/matricula/lotada', MatriculaController.findFulledClasses)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.findRegistration)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.updateRegistration)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.deleteRegistration)
router.post('/pessoas/:estudanteId/matricula', MatriculaController.createRegistration)
router.post('/pessoas/:estudanteId/block', PessoaController.blockPerson)

module.exports = router