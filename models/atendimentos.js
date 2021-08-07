//Responsabilidade => conectar, enviar e validar dados com o banco de dados

const moment = require('moment')

const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res){

        //criando data
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')


        //validacoes
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao) //retorna booleano
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida, 
                mensagem: "Data deve ser maior ou igual a data atual!"
            },
            {
                nome: "cliente",
                valido: clienteEhValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres."
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido) //retorna campos invalidos
        const existemErros = erros.length    //se for 0, false

        if(existemErros){
            res.status(400).json(erros)     //erros do que aconteceu

        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
    
                if(erro){
                    res.status(400).json(erro);   //bad request
                } else {
                    res.status(201).json(resultados);   //ok request
                }
            })
        }
    }
}

module.exports = new Atendimento