const nodemailer = require('nodemailer')

const configuracaoEmailProducao = {
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true
}

const configuracaoEmailTeste = (contaTeste) => ({
    host: 'smtp.ethereal.email',
    auth: contaTeste,
})

async function criaConfiguracaoEmail() {
    if (process.env.NODE_ENV === 'production') {
        return configuracaoEmailProducao
    } else {
        const contaTeste = await nodemailer.createTestAccount()
        return configuracaoEmailTeste(contaTeste)
    }
}
class Email {

    async enviaEmail() {
        const configuracaoEmail = await criaConfiguracaoEmail()
        const transportador = nodemailer.createTransport(configuracaoEmail)

        const info = await transportador.sendMail(this)
        if (process.env.NODE_ENV !== 'production') {
            console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
        }
    }
}

class EmailVerificacao extends Email {
    constructor(usuario, endereco) {
        super()

        this.from = 'noreply@blogdocodigo.com.br'
        this.to = usuario.email
        this.subject = 'Verificação de email'
        this.text = `Olá! Verifique seu email aqui: ${endereco}`
        this.html = `<h1>Olá!</h1> <p>Verifique seu email aqui: <a href="${endereco}">${endereco}</a></p>`
    }
}

module.exports = { EmailVerificacao }










