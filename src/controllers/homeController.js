const Contato = require('../models/ContatoModel')

exports.index = async (req, res,) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
};

/*
5 METODOS DE UM CONTROLLER

index -> lista todos os users -> GET
store/create -> cria um novo user -> POST
delete -> deleta um user -> DELETE
show -> mostra um user -> GET
update -> atualiza um user -> PATCH or PUT
*/
