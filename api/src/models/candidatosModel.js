const knex = require('../../config/database')
const logger = require('../../config/logger')


module.exports.listar = async (request, response) => {
    try {
        let candidatos = await knex('curriculos')
        for (let candidato of candidatos) {
            candidato.endereco = await knex('endereco').where('id_curriculo', candidato.id).first()
        }
        response.status(200).json({ candidatos })
    } catch (error) {
        logger.error('candidatosModel Listar ', error)
        response.status(500).json()
    }
}

module.exports.id = async (request, response) => {
    try {
        let id
        if (parseInt(request.params['id'])) {
            id = parseInt(request.params['id'])
            let candidato = await knex('curriculos').where('id', id).first()
            if (candidato) {
                candidato.endereco = await knex('endereco').where('id_curriculo', candidato.id).first()
                response.status(200).json({ candidato })
            } else {
                response.status(200).json({ })
            }
        } else {
            response.status(500).json()
        }
    } catch (error) {
        logger.error('candidatosModel id ', error)
        response.status(500).json()
    }
}

module.exports.cadastrar = async (request, response) => {
    try {
        let dados = request.body
        let cpf = dados.cpf.replace(/[^\d]+/g, '');
        let existe = await knex('curriculos').where('cpf', cpf).first()
        if (existe) {
            response.status(500).json()
        } else {
            let curriculo = await cadastroCurriculo(dados)
            curriculo ? await cadastroEndereco(dados.endereco, curriculo) : response.status(500).json()
            response.status(200).json()
        }
    } catch (error) {
        logger.error('candidatosModel cadastrar ', error)
        response.status(500).json()
    }
}

module.exports.editar = async (request, response) => {
    try {
        let dados = request.body
        let existe = await knex('curriculos').where('id', dados.id).first()
        if (!existe) {
            response.status(500).json()
        } else {
            await knex('curriculos').where('id', dados.id).update({
                none: dados.nome.trim(),
                data_nascimento: dados.data_nascimento,
                telefone_1: dados.telefone_1,
                telefone_2: dados.telefone_2,
                celular: dados.celular,
                contato: dados.contato,
                email: dados.email.trim(),
                profissao: dados.profissao,
                estado_civil: dados.estado_civil,
                genero: dados.genero,
                cargo_pretendido: dados.cargo_pretendido,
                possui_veiculo: dados.veiculo,
                cnh: dados.cnh,
                rg: dados.rg
            })
            await knex('endereco').where('id_curriculo', dados.id).update({
                logradouro: dados.endereco.logradouro.trim(),
                numero: dados.endereco.numero.trim(),
                bairro: dados.endereco.bairro.trim(),
                cidade: dados.endereco.cidade.trim(),
                estado: dados.endereco.estado.trim(),
                cep: dados.endereco.cep.trim()
            })
            response.status(200).json()
        }
    } catch (error) {
        logger.error('candidatosModel editar ', error)
        response.status(500).json()
    }
}

module.exports.deletar = async (request, response) => {
    try {
        let dados = request.body
        let existe = await knex('curriculos').where('id', dados.id).first()
        if (!existe) {
            response.status(500).json()
        } else {
            await knex('curriculos').where('id', dados.id).delete()
            await knex('endereco').where('id_curriculo', dados.id).delete()
            response.status(200).json()
        }
    } catch (error) {
        logger.error('candidatosModel deletar ', error)
        response.status(500).json()
    }
}

async function cadastroCurriculo(dados) {
    try {
        let cadastro = await knex('curriculos').insert({
            none: dados.nome.trim(),
            data_nascimento: dados.data_nascimento,
            telefone_1: dados.telefone_1,
            telefone_2: dados.telefone_2,
            celular: dados.celular,
            contato: dados.contato,
            email: dados.email.trim(),
            profissao: dados.profissao,
            estado_civil: dados.estado_civil,
            genero: dados.genero,
            cargo_pretendido: dados.cargo_pretendido,
            possui_veiculo: dados.veiculo,
            cnh: dados.cnh,
            rg: dados.rg,
            cpf: dados.cpf,
        })
        return cadastro
    } catch (error) {
        logger.error('candidatosModel cadastroCurriculo ', error)
        return false
    }
}

async function cadastroEndereco(dados, id_curriculo) {
    try {
        let cadastro = await knex('endereco').insert({
            id_curriculo: id_curriculo,
            logradouro: dados.logradouro.trim(),
            numero: dados.numero.trim(),
            bairro: dados.bairro.trim(),
            cidade: dados.cidade.trim(),
            estado: dados.estado.trim(),
            cep: dados.cep.trim()
        })
        return cadastro
    } catch (error) {
        logger.error('candidatosModel cadastroEndereco ', error)
        return false
    }
}
