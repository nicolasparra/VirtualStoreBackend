'use strict'

const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/usuario');
const Categoria = require('../models/categoria');
const Cloudinary = require('cloudinary');
Cloudinary.config({
    cloud_name: "dznpvvb3b",
    api_key: "594926989875343",
    api_secret: "LZrvUodcfCEBUEIgcfnsz3p8ssM"

});
//Muestra todos los items (paginacion de 10)
function getItem(req, res) {
    Item.find({}).populate('usuario categoria').exec((err, items) => {
        if (err) return res.status(500).send({ data: `Error al conectar al servidor: ${err}` })
        if (!items) return res.status(404).send({ data: 'No hay Items registrados' })
        return res.status(200).send({ data: items })
    })
}//end getItem

//Muestro un item segun su id
function getItemId(req, res) {
    let itemID = req.params.idItem;
    Item.findById(itemID).populate('usuario categoria').exec((err, item) => {
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!item) return res.status(404).send({ error: "No es encontro item con esa id" });
        res.status(200).send({ data: item });
    });
}//end getItemID

//Modificar un item 
function editItem(req, res) {
    let itemID = req.params.idItem;

    Item.findById(itemID).populate('usuario categoria').exec((err, item) => {
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!item) return res.status(404).send({ error: "No es encontro item con esa id" });

        item.precio = req.body.precio,
            item.descripcion = req.body.descripcion
        item.save((err) => {
            if (err) return res.status(500).send({ error: `Error al modificar item ` + err });
            return res.status(200).send({ data: item });
        });
    });
}

//Elimina un item segun su id
function deleteItem(req, res) {
    let idItem = req.params.idItem;
    Item.findById(idItem, (err, item) => {
        if (err) return res.status(500).send({ error: `Error con el servidor: ${err}` });
        if (!item) return res.status(404).send({ error: "No es encontro item con esa id" });
        User.findById(item.usuario, (err, usuario) => {
            if (err) return res.status(500).send({ error: `Error con el servidor: ${err}` });
            if (!usuario) return res.status(404).send({ error: "No es encontro usuario con esa id" });
            Categoria.findById(item.categoria, (err, categoria) => {
                if (err) return res.status(500).send({ error: `Error con el servidor: ${err}` });
                if (!categoria) return res.status(404).send({ error: "No es categoria usuario con esa id" });
                var i = categoria.items.indexOf(item._id);
                if (i !== -1) {
                    categoria.items.splice(i, 1);
                }
                categoria.save((err) => {
                    if (err) return res.status(500).send({ error: `Error con el servidor: ${err}` });
                });
                var j = usuario.items.indexOf(item._id);
                if (j !== -1) {
                    usuario.items.splice(i, 1);
                }
                usuario.save((err) => {
                    if (err) return res.status(500).send({ error: `Error con el servidor: ${err}` });
                });
                item.remove(err => {
                    if (err) return res.status(500).send({ error: `No se pudo borrar item ${err}` });
                    res.status(200).send({ data: 'Item eliminado correctamente' });
                });
            })
        })
    });
}

//Metodo que permite crear un item
function registerItem(req, res) {
    const item = new Item({
        precio: req.body.precio,
        nombre: req.body.nombre,
        usuario: req.user.id,
        foto: req.body.foto,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion
    });
    User.findById(req.user.id).exec((err, usuario) => {
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!usuario) return res.status(404).send({ error: "No es encontro usuario con esa id" });
        Categoria.findById(req.body.categoria).exec((err, categoria) => {
            if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
            if (!categoria) return res.status(404).send({ error: "No es encontro categoria con esa id" });
            item.save((err, itemCreated) => {
                if (err) return res.status(500).send({ error: `Error al crear item ` + err });
                categoria.items.push(itemCreated._id);
                categoria.save((err) => {
                    if (err) return res.status(500).send({ error: `Error con el servidor ` + err });
                    usuario.items.push(itemCreated._id);
                    usuario.save((err) => {
                        if (err) return res.status(500).send({ error: `Error con el servidor ` + err })
                        return res.status(200).send({ data: itemCreated });
                    });
                });
            });
        });
    });
}

async function registerFotoItem(req, res) {
    let itemID = req.params.idItem;
    Item.findById(itemID).exec( async (err, item) => {
        if (err) return res.status(500).send({ error: `Error al conectar al servidor: ${err}` });
        if (!item) return res.status(404).send({ error: "No es encontro item con esa id" });
        const result = await Cloudinary.v2.uploader.upload(req.file.path);
        item.foto = result.url;
        item.save((err) => {
            if (err) return res.status(500).send({ error: `Error con el servidor ` + err })
            return res.status(200).send({ data: item });
        });

    });
}


module.exports = {
    getItem,
    getItemId,
    registerItem,
    deleteItem,
    editItem,
    registerFotoItem
}