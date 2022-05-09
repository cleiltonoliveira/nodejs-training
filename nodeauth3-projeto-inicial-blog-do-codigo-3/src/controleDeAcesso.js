const AccessControl = require('accesscontrol')
const controle = new AccessControl()

controle.grant('assinante')
    .readAny('post', ['id', 'titulo', 'conteudo', 'autor'])
    .readAny('usuario', ['nome'])
controle.grant('editor')
    .extend('assinante')
    .createOwn('post')
    .deleteOwn('post')
controle.grant('admin')
    .createAny('post')
    .readAny('post')
    .deleteAny('post')
    .deleteAny('usuario')
    .readAny('usuario')
module.exports = controle

