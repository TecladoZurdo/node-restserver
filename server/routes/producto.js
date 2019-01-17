
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
app.post('/producto', verificaToken, (req,resp)=>{
    
  let body = req.body;

 

  let producto = new Producto({
      nombre: body.nombre,
      precioUni: body.precioUni,
      descripcion: body.descripcion,
      categoria: body.categoria,
      usuario: req.usuario._id
  });
  
  producto.save ( (err, productoDB )=>{
      if (err) {
        return resp.status(500).json({
          ok:false,
          err
        });
      }
      if (!productoDB) {
        return resp.status(400).json({
          ok:false,
          err
        });
      }
      resp.json({
        ok:true,
        producto: productoDB
      });
  });

  });


//==============================
// Actualizar un producto
//==============================
app.put('/producto/:id',[verificaToken], (req,resp)=>{
    
  let id = req.params.id;
  let body = req.body;

  Producto.findById(id, (err, productoDB)=>{
      if(err) {
        return resp.status(500).json({
          ok:false,
          err
        });
      }

      if(!productoDB){
        return resp.status(400).json({
          ok:false,
          err: {
            message:'El ID no existe'
          }
        });
      }

      productoDB.nombre = body.nombre;
      productoDB.descripcion = body.descripcion;
      productoDB.precioUni = body.precioUni;
      productoDB.categoria = body.categoria;
      productoDB.disponible = body.disponible;

      productoDB.save( (err,productoGuardado)=>{
        if(err) {
          return resp.status(500).json({
            ok:false,
            err
          });
        }

        resp.json({
          ok:true,
          producto: productoGuardado
        });
      });

  });
  
  });


//==============================
// Borrar  un producto
//==============================
app.delete('/productos/:id', (req,resp)=>{
    //disponible a false
  
  });








module.exports = app;