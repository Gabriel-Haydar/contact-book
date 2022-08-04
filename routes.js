const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const userController = require('./src/controllers/userController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/localMiddleware');

// Home routes
route.get('/', homeController.index);

// User routes
route.get('/user/index', userController.index);
route.get('/user/logout', userController.logout);
route.post('/user/register', userController.register);
route.post('/user/login', userController.login);

// Contact routes
route.get('/contact/index', loginRequired, contactController.index);
route.get('/contact/edit/:id', loginRequired, contactController.editIndex);
route.get('/contact/delete/:id', loginRequired, contactController.delete)
route.post('/contact/register', loginRequired, contactController.register);
route.post('/contact/edit/:id', loginRequired, contactController.update);

module.exports = route;