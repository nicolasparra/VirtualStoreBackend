'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuario = Schema({
    nombre : {type:String,required:true,maxlength:100},
    foto:{type:String},
    token:{type:String,select:false},
    email:{type:String,maxlength:100},
    password:{type:String,required:true,select:false},
    telefono:{type:Number,maxlength:15},
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'item'}]
});

//1-->User
//2--Admin
//3-->Superadmin
const modelo = mongoose.model('usuario',  usuario); 
module.exports = modelo;