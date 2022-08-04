
const Contact = require('../models/contactModel');

exports.index = async (req, res) => {
    const contacts = await Contact.findContacts();
    res.render('index', { contacts });
}