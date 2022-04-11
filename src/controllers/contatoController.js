const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato salvo com sucesso! 😎🤞')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('err');
    }
}

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('err');
    const contato = await Contato.buscaId(req.params.id);

    if (!contato) return res.render('err');
    res.render('contato', { contato });
}

exports.edit = async function (req, res) {
    try {
        if (!req.params.id) return res.render('err');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato editado com sucesso! 😉👌')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('err');
    }
}

exports.delete = async function (req, res) {
    if (!req.params.id) return res.render('err');
    const contato = await Contato.delete(req.params.id);

    if (!contato) return res.render('err');
    req.flash('success', 'Contato deletado com sucesso! 😲')
    req.session.save(() => res.redirect('/'));
    return;
}