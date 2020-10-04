'use strict'

const mongoose = require('mongoose');
const Compra = require('../models/compra');
const User = require('../models/usuario');
const Item = require('../models/item');

//Crear Compras
function crearCompra(req,res) {
    Item.findById(req.body.item).exec((err, item) => {
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!item) return res.status(404).send({ error: "No es encontro item con esa id" });   
        const compra = new Compra({            
            oferente: item.usuario,
            consumidor: req.user.id,
            item: req.body.item,
            cantidad: req.body.cantidad
        })
        compra.save((err) => {
            if (err) return res.status(500).send({ error: `Error al crear compra : ` + err });
            return res.status(200).send({ data: compra });
        });
    });
}

//Obtener Compras Usuario Logueado
function obtenerComprasUser(req,res) {
    Compra.find({
        consumidor:req.user.id
    }).populate('consumidor oferente item').exec((err,compras)=>{
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!compras) return res.status(404).send({ error: "No es encontro compras" });
        return res.status(200).send({ data: compras });
    });
}

//Obtener Compras Usuario Logueado
function obtenerVentasUser(req,res) {
    Compra.find({
        oferente:req.user.id
    }).populate('consumidor oferente item').exec((err,compras)=>{
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!compras) return res.status(404).send({ error: "No es encontro compras" });
        return res.status(200).send({ data: compras });
    });
}

module.exports = {
    crearCompra,
    obtenerComprasUser,
    obtenerVentasUser
}