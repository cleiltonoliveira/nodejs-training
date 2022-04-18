const jwt = require('jsonwebtoken');
const allowListRefreshToken = require('../../redis/allowlist-refresh-token');
const crypto = require('crypto')
const moment = require('moment')
const blocklistAccessToken = require('../../redis/blocklist-access-token');
const { InvalidArgumentError } = require('../erros');

function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
    const payload = { id };

    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: tempoQuantidade + tempoUnidade });
    return token;
}

async function verificaTokenJWT(token, tokenName, blocklist) {
    await verificaTokenNaBlocklist(token, tokenName, blocklist);
    const { id } = jwt.verify(token, process.env.CHAVE_JWT);
    return id
}

async function verificaTokenNaBlocklist(token, tokenName, blocklist) {
    const tokenNaBlocklist = await blocklist.contemToken(token);
    if (tokenNaBlocklist) {
        throw new jwt.JsonWebTokenError(`${tokenName} token inválido por logout!`);
    }
}

async function criaTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowList) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix()
    await allowList.adiciona(tokenOpaco, id, dataExpiracao)
    return tokenOpaco
}

// verifica se o token existe na allow list e obtem o id do usuario
async function verificaTokenOpaco(token, tokenName, allowlist) {
    verificaTokenEnviado(token, tokenName);
    const id = await allowlist.buscaValor(token)
    verificaTokenValido(id, tokenName);
    return id
}

function verificaTokenValido(id, tokenName) {
    if (!id) {
        throw new InvalidArgumentError(`${tokenName} token inválido`);
    }
}

function verificaTokenEnviado(token, tokenName) {
    if (!token) {
        throw new InvalidArgumentError(`${tokenName} token nao enviado`);
    }
}

module.exports = {
    access: {
        tokenName: 'Access',
        lista: blocklistAccessToken,
        expiracao: [15, 'm'],
        cria(id) {
            return criaTokenJWT(id, this.expiracao)
        },
        verifica(token) {
            return verificaTokenJWT(token, this.tokenName, this.lista)
        }
    },
    refresh: {
        tokenName: 'Refresh',
        lista: allowListRefreshToken,
        expiracao: [5, 'd'],
        cria(id) {
            return criaTokenOpaco(id, this.expiracao, this.lista)
        },
        verifica(token) {
            return verificaTokenOpaco(token, this.tokenName, this.lista)
        }
    }
}

