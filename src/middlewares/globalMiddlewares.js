exports.setGlobalVariables = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.successes = req.flash('successes');
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('badToken');
    } else if (err) {
        return res.render('error404');
    }
    next();
}

exports.csrfTokenLocalVar = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}