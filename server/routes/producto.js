
const express= require('express');

const {verificaToken} = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


//==============================
// Ontener productos
//==============================
app.get('/productos', (req,resp)=>{
 //trae todos los productos
  // populate : usuario categoria
  // paginado

});


//==============================
// Ontener productos por ID
//==============================
app.get('/productos/:id', (req,resp)=>{
  //populate : usuari categoria

});


//==============================
// Crear un nuevo producto
//==============================
app.post('/productos', (req,resp)=>{
    //grabar el usuario
    // grabar una categoria del listado
  
  });


//==============================
// Actualizar un producto
//==============================
app.put('/productos/:id', (req,resp)=>{
    //grabar el usuario
    // grabar una categoria del listado
  
  });


//==============================
// Borrar  un producto
//==============================
app.delete('/productos/:id', (req,resp)=>{
    //disponible a false
  
  });








module.exports = app;