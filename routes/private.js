'use strict'

const express = require('express');
const privateRouter = express.Router();
const middleware = require('../middlewares/middleware');
const itemController = require('../controllers/itemController');
const userController= require('../controllers/usuarioController');
const comprasController= require('../controllers/comprasController');
//Images
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: '../public/images/' })

privateRouter.post('/item/foto/:idItem',middleware.isAuth,itemController.registerFotoItem);
privateRouter.post('/item',middleware.isAuth,itemController.registerItem);
privateRouter.get('/item',middleware.isAuth,itemController.getItem);
privateRouter.get('/item/:idItem',middleware.isAuth,itemController.getItemId);
privateRouter.delete('/item/:idItem',middleware.isAuth,itemController.deleteItem);
privateRouter.put('/item/:idItem',middleware.isAuth,itemController.deleteItem);
privateRouter.get('/user',middleware.isAuth,userController.getMe);
privateRouter.put('/user',middleware.isAuth,userController.updateMe);
privateRouter.post('/compras',middleware.isAuth,comprasController.crearCompra);
privateRouter.get('/compras',middleware.isAuth,comprasController.obtenerComprasUser);
privateRouter.get('/ventas',middleware.isAuth,comprasController.obtenerVentasUser);
module.exports = privateRouter;