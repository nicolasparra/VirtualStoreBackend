'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoria = Schema({
    items : [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
    nombre: {type:String,required:true,maxlength:100}
});


const modelo = mongoose.model('categoria',  categoria); 
module.exports = modelo;