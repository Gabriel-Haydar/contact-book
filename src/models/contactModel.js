const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdOn: { type: Date, default: Date.now() }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contactData = null;
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof (this.body[key]) !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            email: this.body.email,
            phone: this.body.phone
        };
    }

    static async findContactById(id) {
        if (typeof id !== "string") return;
        const contact = await ContactModel.findOne({ _id: id });
        return contact;
    }

    static async findContacts() {
        const contacts = await ContactModel.find();
        return contacts;
    }

    async findContactByFirstName() {
        this.contactData = await ContactModel.findOne({ firstName: this.body.firstName });
    }

    async validateBody() {
        this.cleanUp();
        // E-mail needs to be valid
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail address!');
        if (!this.body.firstName) this.errors.push('A first name is required!');
        if (!this.body.phone && !this.body.email) {
            this.errors.push('Either a phone number or an e-mail address is required!');
        }
    }

    async register() {
        await this.validateBody();
        await this.findContactByFirstName();

        // The new contact can't already be on the database
        if (this.contactData) this.errors.push('Contact already exists!');
        // Not registering if there are any errors
        if (this.errors.length > 0) return;

        // Adding contact to database
        this.contactData = await ContactModel.create(this.body);
    }

    async update(id) {
        if (typeof id !== "string") return;
        await this.validateBody();
        if (this.errors.length > 0) return;
        this.contactData = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async delete(id) {
        if (typeof id !== "string") return;
        const contact = await ContactModel.findOneAndDelete({ _id: id });
        return contact;
    }
}

module.exports = Contact;