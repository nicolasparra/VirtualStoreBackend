'use strict'

const mongoose = require('mongoose'); 
const app = require('./app');
const config = require('./config');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

app.use('/auth',authRoutes);
app.use('/public',publicRoutes);
app.use('/private',privateRoutes);

app.get('/',(req,res)=>{
    res.send({message:'Api Rest VirtualStore'})
})

mongoose.connect(config.db,{ useNewUrlParser: true, useUnifiedTopology: true },(err,res)=>{
    if(err){
        return console.log(`Error al conectar a base de datos: ${err}`);
    }
    console.log('conexion a base de datos establecida');
    //Start backend
    app.listen(config.port, () => {
        console.log(`API REST conrriendo en http://localhost:${config.port}`)
    });
})