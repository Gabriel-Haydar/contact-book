const Contact = require('../models/contactModel');

exports.index = (req, res) => {
    res.render("contact", { contact: {} });
}

exports.register = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.register();

        if (newContact.errors.length > 0) {
            req.flash('errors', newContact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('successes', 'Your new contact was added successfully!!!');
        req.session.save(() => res.redirect(`/contact/edit/${newContact.contactData._id}`));
    }
    catch (e) {
        console.error(e);
        res.render('error404');
    }
}

exports.editIndex = async (req, res) => {
    // Checking if there is an id paramater in the url
    if(!req.params.id) return res.render('error404');
    try {
        const contact = await Contact.findContactById(req.params.id);
        if(!contact) return res.render('error404');
    
        res.render('contact', { contact });
    } catch (e) {
        console.error(e);
        res.render('error404');
    }
}

exports.update = async (req, res) => {
    // Checking if there is an id paramater in the url
    if(!req.params.id) return res.render('error404');
    try {
        const contact = new Contact(req.body);
        contact.update(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', newContact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }

        req.flash('successes', 'You did it! You edited your contact information!!!');
        req.session.save(() => res.redirect(`/contact/edit/${contact.contactData._id}`));


    } catch (e) {
        console.error(e);
        res.render('error404');
    }

}

exports.delete = async (req, res) => {
    // Checking if there is an id paramater in the url
    if(!req.params.id) return res.render('error404');
    try {
        const contact = await Contact.delete(req.params.id);
        if(!contact) return res.render('error404');

        req.flash('successes', 'Contact deleted.');
        req.session.save(() => res.redirect('back'));
    
    } catch (e) {
        console.error(e);
        res.render('error404');
    }
}