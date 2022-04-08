const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// ROTAS HOME
route.get('/', homeController.index);

// ROTAS LOGIN
route.get('/login',loginController.index);
route.post('/login/register',loginController.register);
route.post('/login/login',loginController.login);
route.get('/login/logout',loginController.logout);

module.exports = route;