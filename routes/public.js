'use strict'

const express = require('express');
const publicRouter = express.Router();
const middleware = require('../middlewares/middleware');
const categoriaController = require('../controllers/categoriaController');

publicRouter.post('/categoria',categoriaController.createCategoria);
publicRouter.get('/categoria',categoriaController.getCategorias);
publicRouter.get('/categoria/all',categoriaController.getCategoriaProduct);


module.exports = publicRouter;