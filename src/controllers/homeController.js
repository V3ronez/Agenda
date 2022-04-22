const Contato = require('../models/ContatoModel')

exports.index = async (req, res,) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
};

/*
5 METODOS DE UM CONTROLLER

index -> lista todos os users
store/create -> cria um novo user
delete -> deleta um user
show -> mostra um user
update -> atualiza um user
*/
