const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, "El nombre es necesario"],
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es necesaria"],
    },
});

//Valida que la categoria sea unica
//categoriaSchema.plugin(uniqueValidator, { message: "{PATH} debe ser única" });

module.exports = mongoose.model("categoria", categoriaSchema);