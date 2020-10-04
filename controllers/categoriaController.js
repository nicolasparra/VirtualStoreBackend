'use strict'

const mongoose = require('mongoose');
const Categoria = require('../models/categoria');

function createCategoria(req,res){
    const categoria = new Categoria({            
        nombre: req.body.nombre
    })
    categoria.save((err) => {
        if (err) return res.status(500).send({ error: `Error al crear categoria : ` + err });
        return res.status(200).send({ data: categoria });
    });
}

function getCategorias(req,res){
    Categoria.find({}, (err, categorias) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` })
        if (!categorias) return res.status(404).send({ data: 'No hay categorias registradas' })
        return res.status(200).send({ data: categorias })
    })
}

function getCategoriaProduct(req,res){
    Categoria.find({}).populate('items').exec((err, categorias) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` })
        if (!categorias) return res.status(404).send({ data: 'No hay categorias registradas' })
        return res.status(200).send({ data: categorias })
    })
}


module.exports={
createCategoria,
getCategorias,
getCategoriaProduct
}

