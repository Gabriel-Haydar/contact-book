import validator from 'validator';

export default class UserFormValidator {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e)
        })
    }

    createErrorP(errorMsg) {
        // Creating p to show error message after input
        const p = document.createElement('p');
        p.appendChild(errorMsg);
        p.classList.add('error');
        p.classList.add('alert-danger');
        return p;
    }

    validate(e) {
        const errors = document.querySelectorAll('.error');
        for (let p of errors) {
            p.remove();
        };

        const element = e.target;
        const emailInput = element.querySelector('input[class="form-control email"]');
        const passwordInput = element.querySelector('input[class="form-control password"]');
        let error = false;

        // Validating e-mail address
        if (!validator.isEmail(emailInput.value)) {
            const errorMsg = document.createTextNode('Invalid e-mail address!');
            const p = this.createErrorP(errorMsg);
            emailInput.after(p);
            error = true;
        }
        // Validating if password is between 6 and 20 characters long.
        if (passwordInput.value.length < 6 || passwordInput.value.length > 20) {
            const errorMsg = document.createTextNode('Your password needs to be between 6 and 20 characters long!');
            const p = this.createErrorP(errorMsg);
            passwordInput.after(p);
            error = true;
        }
        // If there are no errors, submission is made.
        if (!error) element.submit();
    }
}