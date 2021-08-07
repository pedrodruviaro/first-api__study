//RESPONSABILIDADE => controlar as rotas e o que fazer em cada uma

const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send('Voce esta na rota de atendimentos e esta realizando um GET')
    })

    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body   //objeto enviado pelo metodo post

        Atendimento.adiciona(atendimento, res)   //instanciando novo atendimento pelo metodo e envindo atendimento E res para checagem do status http

        
        
    })
}

