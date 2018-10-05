

//======================
//PUERTO    
//======================
process.env.PORT = process.env.PORT || 3000;


//======================
// Entorno
//======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
// BASE DE DATOS - 
//======================

let urlDB;

if (process.env.NODE_ENV){
 urlDB = 'mongodb://localhost:27017/cafelate';
}else {
 urlDB = 'mongodb://usr_cafelate:usrCaf3lat3@ds223343.mlab.com:23343/cafelate';
}

process.env.urlBD = urlDB;