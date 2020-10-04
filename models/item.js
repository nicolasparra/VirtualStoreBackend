'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const item = Schema({
    precio : {type:Number,required:true,maxlength:15},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
    foto:{type:String},
    categoria:{type: mongoose.Schema.Types.ObjectId, ref: 'categoria'},
    descripcion:{type:String,required:true,maxlength:500}
});

// item.plugin(mongoosePaginate);
const modelo = mongoose.model('item',  item); 
// modelo.paginate().then({})// Usage
module.exports = modelo;