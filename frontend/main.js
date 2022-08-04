import 'core-js/stable';
import 'regenerator-runtime';

import ContactFormValidator from './modules/ContactFormValidator';
import UserFormValidator from './modules/UserFormValidator';

// Validating contact, login and signup forms
const contactFormValidator = new ContactFormValidator('.contact');
contactFormValidator.init();

const loginFormValidator = new UserFormValidator('.login');
loginFormValidator.init();

const signUpFormValidator = new UserFormValidator('.signup');
signUpFormValidator.init();