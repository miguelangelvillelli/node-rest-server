require("./config/config");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Configuración global de rutas
app.use(require("./routes/index"));

//"mongodb://localhost:27017/mascotas", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },

mongoose.connect(
    process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log("Base de datos Online");
        }
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});