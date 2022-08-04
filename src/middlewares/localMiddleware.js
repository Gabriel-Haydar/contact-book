exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'You need to login first before you can add, edit or delete a new contact to your contact book!');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}