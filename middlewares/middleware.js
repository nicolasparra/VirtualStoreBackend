'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/usuario');

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({'Error':'Debe estar logeado'});
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token, config.secret);
    User.findById(payload.id).select('+token').exec((err,user)=>{ 
        if(err) return res.status(406).send({ 'error': 'No se encontro un usuario asociado a la sesion' });
        if(user.token != token) return res.status(403).send({'Error':'Token ya expiro'});
        req.user = user;
        next();
    });
}

function HasRole(roles) {
    return function(req, res, next) {
      if(!req.headers.authorization){
        return res.status(403).send({'Error':'Debe estar logeado'});
      }
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.decode(token, config.secret);
      var pasa=false;
      for (let index = 0; index < roles.length; index++) {
        if (roles[index] == payload.rol){
          pasa=true;
        } 
      }
      if(!pasa){
        return res.status(401).send({'Error':'No tiene permisos para acceder'});
      }else{
        next();
      }    
    }//End function
}//end HasRola




module.exports = {
        isAuth,
        HasRole
};