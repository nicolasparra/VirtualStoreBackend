'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compra = Schema({
    oferente : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    consumidor: {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    item:{type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    cantidad:{type:Number,required:true},
});


const modelo = mongoose.model('compra',  compra); 
module.exports = modelo;