const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

const bcrypt = require('bcryptjs');
const _ = require('underscore');

app.get('/usuario', function (req, res) {
    
    let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;

    limite = Number(limite);

    Usuario.find({estado:true},'nombre email rol estado google img')
        .skip(desde)
        .limit(limite)
        .exec( (err, usuarios) =>{
            if (err) {
                return res.status(400).json({
                     ok:false,
                     err
                 });
             }

             Usuario.count({estado:true}, (err, conteo) =>{
                    res.json({
                            ok:true,
                            usuarios,
                            cuantos:conteo
                    });
             });

             
        })

  });
  
  app.post('/usuario', function (req, res) {
      
      let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        rol: body.rol
    });

    usuario.save( (err, usuarioDB) =>{

        if (err) {
           return res.status(400).json({
                ok:false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });
  
    //   if (body.nombre === undefined) {
    //       res.status(400).json({
    //           ok:false,
    //           mensaje: "Nombre es necesario"
    //       });
    //   }else {
    //       res.json({
    //           persona:body
    //       });
    //   }
  
      
    });
  
  app.put('/usuario/:id', function (req, res) {

      let id = req.params.id;
      let body = _.pick(req.body,['nombre','email','img','rol','estado']);


    //   delete body.password;
    //   delete body.google;

      Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 

        res.json( {
            ok: true,
            usuario : usuarioDB
        });

       });

      
    });
  
//   app.delete('/usuario/:id', function (req, res) {
//       let id = req.params.id;

//       Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         } 

//         if(!usuarioBorrado){
//             return res.status(400).json({
//                 ok: false,
//                 err:{
//                     mensaje:"Usuario no encontrado"
//                 }
//             });
//         }

//         res.json({
//             ok:true,
//             usuario: usuarioBorrado
//         });

//       });

//     });

    app.delete('/usuario/:id', function (req, res) {
        let id = req.params.id;
  
        let cambiaEstado = {estado:false};

        Usuario.findByIdAndUpdate(id, cambiaEstado ,{new:true}, (err, usuarioBorrado)=>{
          if (err) {
              return res.status(400).json({
                  ok: false,
                  err
              });
          } 
            
  
          res.json({
              ok:true,
              usuario: usuarioBorrado
          });
  
        });
  
      });

module.exports = app;
