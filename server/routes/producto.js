
const express= require('express');

const {verificaToken} = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


//==============================
// Ontener productos
//==============================
app.get('/productos',verificaToken, (req,resp)=>{
 //trae todos los productos
  // populate : usuario categoria
  // paginado

  let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;

    limite = Number(limite);

  Producto.find({disponible:true})
  .skip(desde)
  .limit(limite)
  .populate('usuario','nombre email')
  .populate('categoria','descripcion')
  .exec((err, productoDB)=>{
     if(err) {
       return resp.status(500).json({
        ok:false,
        err
       });
     }

     resp.json({
       ok:true,
       productoDB 
     });
  });

});


//==============================
// Ontener productos por ID
//==============================
app.get('/productos/:id', (req,resp)=>{
  //populate : usuari categoria
  let id = req.params.id;

  Producto.findById( id)
  .populate('usuario', 'nombre email')
  .populate('categoria', 'nombre')
  .exec((err,productoDB)=>{
    if(err) {
      return resp.status(500).json({
       ok:false,
       err
      });
    }

    if(!productoDB){
      return resp.status(400).json({
        ok:false,
        err : {
          message: 'ID no existe'
        }
      });
    }

    resp.json({
      ok:true,
      producto: productoDB
    });
  });

});
//==============================
// Buscar producto
//==============================
app.get('/productos/buscar/:termino',verificaToken,(req,res)=>{

  let termino = req.params.termino;

  let regex = new RegExp(termino, 'i');

  Producto.find({ nombre:regex})
  .populate('categoria','nombre')
  .exec((err,productosBD)=>{
    if(err) {
      return resp.status(500).json({
       ok:false,
       err
      });
    }

    res.json({
      ok:true,
      productosBD
    });
  })
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
app.delete('/producto/:id',verificaToken, (req,resp)=>{
    //disponible a false
    let id = req.params.id;

    Producto.findById(id, (err,productoDB)=>{
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

      productoDB.disponible = false;

      productoDB.save( (err,productoBorrado)=>{
        if(err) {
          return resp.status(500).json({
            ok:false,
            err
          });
        }
        resp.json({
          ok:true,
          producto:productoBorrado,
          message:'Producto borrado'
        });
      });

    });
  });








module.exports = app;