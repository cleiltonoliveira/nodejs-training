const nodemailer = require('nodemailer')

class Email {

    async enviaEmail() {
        const contaTeste = await nodemailer.createTestAccount()
        const transportador = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: contaTeste,
        })

        const info = await transportador.sendMail(this)
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
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










