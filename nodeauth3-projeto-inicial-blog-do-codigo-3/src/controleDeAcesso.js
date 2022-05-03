const AccessControl = require('accesscontrol')
const controle = new AccessControl()

controle.grant('assinante').readAny('post', ['id', 'titulo', 'conteudo', 'autor'])
controle.grant('editor')
    .extend('assinante')
    .createOwn('post')
    .deleteOwn('post')
controle.grant('admin')
    .createAny('post')
    .deleteAny('post')
    .deleteAny('usuario')
    .readAny('usuario')
module.exports = controle

