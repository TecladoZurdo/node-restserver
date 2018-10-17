

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

if (process.env.NODE_ENV === 'dev'){
 urlDB = 'mongodb://localhost:27017/cafelate';
}else {
 urlDB = process.env.MONGO_URIDB;
}

process.env.urlBD = urlDB;


//======================
// Vencimiento de Token
//======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN= "8h";

//======================
// SEED de autenticación
// semilla
//======================
process.env.SEED = process.env.SEED || 'este-es-el-jwt-desarrollo';


//======================
// Google client_id
//======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '160575302620-mnhapqbc52m9dn5mjrdtv82l26qc5aqe.apps.googleusercontent.com';