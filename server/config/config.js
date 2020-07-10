//======================
// Puerto
//======================
process.env.PORT = process.env.PORT || 3000;

//======================
// Entorno
//======================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//======================
// Vencimiento de TOKEN
//======================
//60 Segundos
//60 Minutos
//24 Horas
//30 Días
//Vigencia del token 1 mes
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//======================
// SEED de autenticación
//======================
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

//======================
// Base de datos
//======================
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/mascota";
} else {
    urlDB = urlDB = process.env.MONGO_URI;
    //"mongodb+srv://mascota-user:!!!13467982Mascota@cluster0.0bshj.mongodb.net/mascota";
}
process.env.URLDB = urlDB;