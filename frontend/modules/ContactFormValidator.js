import validator from 'validator'

export default class ContactFormValidator {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
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
        const firstNameInput = element.querySelector('input[class="form-control first-name"]');
        const phoneInput = element.querySelector('input[class="form-control phone"]');
        const emailInput = element.querySelector('input[class="form-control email"]');
        let error = false;
        
        // Checking if a first name is given
        if (!firstNameInput.value) {
            const errorMsg = document.createTextNode('A first name is required!');
            const p = this.createErrorP(errorMsg)
            firstNameInput.after(p);
            error = true;
        }
        // Checking if either a phone number or an e-mail address is given
        if(!emailInput.value && !phoneInput.value){
            const errorMsg = document.createTextNode('Either a phone number or an e-mail address is required!');
            const p = this.createErrorP(errorMsg);
            phoneInput.after(p);
            emailInput.after(p);
            error = true;
            return;
        }
        // Validating e-mail address
        if (!validator.isEmail(emailInput.value)) {
            const errorMsg = document.createTextNode('Invalid e-mail address!');
            const p = this.createErrorP(errorMsg);
            emailInput.after(p);
            error = true;
        }
        // If there are no errors, submission is made.
        if (!error) element.submit();
    }
}