'use strict'

const express = require('express');
const authRouter = express.Router();
const middleware = require('../middlewares/middleware');
const authController=require('../controllers/authController');

authRouter.post('/registroUser',authController.registerUser);
authRouter.post('/login',authController.login);


module.exports = authRouter;