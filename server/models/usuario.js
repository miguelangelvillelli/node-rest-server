const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} mo es un  rol válido",
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: { type: String, required: [true, "La contraseña es obligatoria"] },
    img: { type: String, required: [false, "La imágen no es obligatoria"] },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos,
    },
    estado: { type: Boolean, default: true },
    goolge: { type: Boolean, default: false },
});

//esto lo uso para quitar la propiedad password del esquema asi no la devuelvo al usuario
//por seguridad
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
};
//Valida el mail que sea unico
usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("usuario", usuarioSchema);