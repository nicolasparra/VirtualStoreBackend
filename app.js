'use strict'

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
///Agregado
const uuid = require('uuid/v4');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('foto'));
// static files
app.use(express.static(path.join(__dirname, 'public')));
///////////////////

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

module.exports = app;