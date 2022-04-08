const Login = require('../models/LoginModel');

exports.index = (req, res, next) => {
    if(req.session.user) return res.render('loginLogado');
    res.render('login');
}

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login');
            });
            return;
        }
        req.flash('success', 'Seu usúario foi criado com sucesso!');
        req.session.save(function () {
            return res.redirect('/login');
        });
    } catch (e) {
        console.log(e);
        return res.render('err');

    }
}

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login');
            });
            return;
        }

        // req.flash('success', 'Logado com sucesso!');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        return res.render('err');

    }
}

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/');
}