const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.findAll)
router.get('/pessoas/:id', PessoaController.findById)
router.post('/pessoas/', PessoaController.save)
router.put('/pessoas/:id', PessoaController.update)
router.delete('/pessoas/:id', PessoaController.delete)

module.exports = router