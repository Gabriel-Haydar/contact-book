const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.userData = null;
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof (this.body[key]) !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

    async findUser() {
        this.userData = await UserModel.findOne({ email: this.body.email });
    }

    async validateBody() {
        this.cleanUp();
        // E-mail needs to be valid
        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail address!');

        // Password must be between 3 and 50 chars
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('Your password needs to be between 3 and 50 characters long!');
        }
    }

    async register() {
        await this.validateBody();
        await this.findUser();

        // The user can't already be on the database
        if (this.userData) this.errors.push('User already exists!');
        // Not registering if there are any errors
        if (this.errors.length > 0) return;

        // Hashing password
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        // Adding user to database
        this.userData = await UserModel.create(this.body);
    }

    async login() {
        await this.validateBody();
        await this.findUser();
        
        // The user can't already be on the database
        if (!this.userData) {
            this.errors.push("User doesn't exist!");
            return;
        };

        if(!bcryptjs.compareSync(this.body.password, this.userData.password)) {
            this.errors.push("Wrong password!");
            this.userData = null;
        }
    }
}

module.exports = User;