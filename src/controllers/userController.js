const User = require('../models/userModel');

exports.index = (req, res) => {
    if (req.session.user) return res.render('logged-in');
    res.render('login');
}

exports.register = async function (req, res) {
    try {
        const newUser = new User(req.body);
        await newUser.register();

        if (newUser.errors.length > 0) {
            req.flash('errors', newUser.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('successes', 'Your new user was created successfully!!!');
        req.session.save(() => res.redirect('back'));
    }
    catch (e) {
        return res.render('error404');
    }
}

exports.login = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.login();

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('successes', 'You logged in!!!');
        req.session.user = user.userData;
        req.session.save(() => res.redirect('back'));
    }
    catch (e) {
        console.error(e);
        return res.render('error404');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}