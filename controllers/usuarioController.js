'use strict'

const mongoose = require('mongoose');
const User = require('../models/usuario');

//Obtiene todos los usuarios registrados
function getUser(req,res){
    User.find({},(err,usuarios)=>{
         if(err) return res.status(500).send({error:`Error al conectar al servidor: ${err}`})
         if(!usuarios) return res.status(404).send({error:'No hay usuario registrados'})
 
         return res.status(200).send({usuarios:usuarios})
     })
 }

 
//Obtiene un usuario segun su id
function getUserId(req,res) {
    let userId = req.params.idUser;

    User.findById(userId).exec((err, usuario)=>{
        if(err) return res.status(500).send({error: `Error al conectar al servidor: ${err}`});
        if(!usuario) return res.status(404).send({error: "No es encontro usuario con esa id" });

        res.status(200).send(usuario);
    });
}


//Obtiene al usuario logueado
function getMe(req, res) {
    User.findById(req.user.id).populate('items').exec((err,usuario)=>{
        if(err) return res.status(500).send({error: `Request: ${req}`});
        if(!usuario) return res.status(404).send({error: "No es encontro usuario con esa id" });
        return res.status(200).send(usuario);
    });
}

//Modifica un usuario logeado
function updateMe(req,res) {
    User.findById(req.user.id).exec((err,user)=>{
        if (err) return res.status(500).send(err.message);
        if(!user) return res.status(404).send({error: "No es encontro usuario con esa id" });
        user.telefono= req.body.telefono,
        user.nombre= req.body.nombre,
        user.foto= req.body.foto,
        user.email= req.body.email
        user.save((err)=>{
            if (err) return res.status(401).send({error:`Error con el servidor: ${err}`});

            return res.status(200).send(user);
        });
    })
}

//Elimina usuario segun su id
function deleteUserById(req,res) {
    let usuarioId = req.params.idUser;

    User.findById(usuarioId, (err,usuario)=>{
        if(err) return res.status(500).send({error: `Error con el servidor: ${err}`});
        if(!usuario) return res.status(404).send({error: "No es encontro usuario con esa id" });
        usuario.remove(err=>{
            if(err) return res.status(500).send({error:`No se pudo borrar usuario ${err}`});
            res.status(200).send({message:'Usuario eliminado correctamente'});
        });       
    });
}



module.exports = {
    getUser,
    getUserId,
    getMe,
    updateMe,
    deleteUserById
}