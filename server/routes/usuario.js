const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

const { verificaToken } = require("../middlewares/autenticacion");

const _ = require("underscore");

const app = express();
app.get("/usuario", verificaToken, (req, res) => {
    //Para paginar, si no viene el parametro por el query arranca de la "0"
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, "nombre email role estado google img")
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo,
                });
            });
        });
});

app.post("/usuario", function(req, res) {
    let body = req.body;

    //lleno el usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });
});

app.put("/usuario/:id", function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, [
        "nombre",
        "email",
        "password",
        "img",
        "role",
        "estado",
    ]);

    Usuario.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB,
            });
        }
    );
});

app.delete("/usuario/:id", function(req, res) {
    let id = req.params.id;

    //Esta línea es para borrar físicamente un registro
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiarEstado = {
        estado: false,
    };

    Usuario.findByIdAndUpdate(
        id,
        cambiarEstado, { new: true },
        (err, usuarioBorrado) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            }

            if (!usuarioBorrado) {
                res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario no encontrado",
                    },
                });
            }

            res.json({
                ok: true,
                usuario: usuarioBorrado,
            });
        }
    );
});

module.exports = app;