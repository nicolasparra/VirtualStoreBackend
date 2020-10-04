'use strict'

const mongoose = require('mongoose');
const User = require('../models/usuario');
const Service = require('../services/services');
const bcrypt = require('bcrypt-nodejs');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

//Metodo para registrar un usuario con rol user
function registerUser(req, res) {
    var hashPass = bcrypt.hashSync(req.body.password, salt);
    const user = new User({      
        password: hashPass,
        nombre: req.body.nombre,
        email: req.body.email
    })
    user.save((err) => {
        if (err) return res.status(500).send({ error: `Error al crear usuario : ` + err });
        return res.status(200).send({ data: user });
    });

}//end registro usuario

//metodo que permite logearse al sistema
function login(req, res) {
    User.findOne({
        email: req.body.email
    }).select('+password +token').exec((err, user) => {
        if (err) return res.status(500).send(err.message);

        if (user == null) return res.status(404).send({ error: `usuario no encontrado`});

        bcrypt.compare(req.body.password, user.password, (err, decrypt) => {
            if (err) return res.status(500).send(err.message);

            if (decrypt) {
                var token = Service.createToken(user);
                user.token = token;

                user.save((err, user) => {
                    if (err) {
                        return res.status(401).send({
                            data: "Un error ha ocurrido con la Base de datos"
                        });
                    }

                    return res.status(200).send({
                        data: token
                    });
                });

            } else {
                return res.status(401).send({
                    data: "Contraseña no corresponde"
                });
            }
        });
    });
}//End login



module.exports = {
    registerUser,
    login
}