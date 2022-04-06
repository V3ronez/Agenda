exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Essa é uma var local'
    next();
}
exports.checkError = (err, req, res, next) => {
    if (err) {
        return res.render('err');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}