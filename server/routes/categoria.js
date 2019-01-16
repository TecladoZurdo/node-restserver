
const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//==============================
// Mostrar todas las categorias
//==============================
app.get('/categoria',verificaToken, (req, res)=>{
  
    Categoria.find()
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec( (err,categoriaDB)=>{
        
        if(err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoriaDB
        });
    });
  
});


//====================================
// Mostrar todas las categorias por ID
//====================================
app.get('/categoria/:id',verificaToken, (req, res)=>{
    let id = req.params.id;

    Categoria.findById(id).exec((err, categoriaDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB) {
            return res.status(400).json({
                ok:false,
                message: 'El id no es correcto'
            });
        }

        res.json({
            ok:true,
            categoriaDB
        });
    });

    
});


//====================================
// Crear una categoria
//====================================
app.post('/categoria', verificaToken, (req, res)=>{
    let body = req.body;
     // regresa la nueva categoria
     // req.usuario._id
     let usuario = req.usuario;
     //console.log(usuario);

     let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: usuario._id
     });

     categoria.save( (err, categoriaBD) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaBD) {
            return res.status(400).json({
                ok:false,
                err
            });
        }
        
        res.json({
            ok:true,
            categoriaBD
        });
     });

    
});

//====================================
// Actualizar la categoria
//====================================
app.put('/categoria/:id', [verificaToken,verificaAdmin_Role], (req, res)=>{
    let query = { _id: req.params.id};
    let body = req.body;
    
    Categoria.findOneAndUpdate(query,body,{new:true, runValidators:true},(err, categoriaBD)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!categoriaBD){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoriaBD
        });
    });

    
});


//====================================
// Eliminar la categoria
//====================================
app.delete('/categoria/:id', [verificaToken,verificaAdmin_Role], (req, res)=>{
    
    let id = req.params.id;
     Categoria.findByIdAndRemove(id,{new:true} ,(err,categoriaBD)=>{

        if(err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!categoriaBD){
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok:true,
            message: 'Categoria eliminada'
         });
     });
    
     
});

module.exports = app;