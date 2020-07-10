const express = require("express");
const { verificaToken } = require("../middlewares/autenticacion");
const Categoria = require("../models/categoria");
const uniqueValidator = require("mongoose-unique-validator");
const _ = require("underscore");

const app = express();

//============================
//Mostrar todas las categorías
//============================
app.get("/categoria", verificaToken, (req, res) => {
    //Para paginar, si no viene el parámetro por el query arranca de la "0"
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find()
        .skip(desde)
        .limit(limite)
        .exec((err, categorias) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Categoria.countDocuments((err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo,
                });
            });
        });
});

//============================
//Mostrar categorias por ID
//============================
app.get("/categoria/:id", (req, res) => {
    //Categoria.findById()
});

//============================
//Crear nueva categoria
//============================
app.post("/categoria", verificaToken, (req, res) => {
    let body = req.body;

    //lleno la categoría
    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            categoria: categoriaDB,
            usuario: {
                id: req.usuario._id,
                nombre: req.usuario.nombre,
            },
        });
    });
});

//============================
//Actualizar categoría
//============================
app.put("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ["nombre", "descripcion"]);

    // return res.json({
    //     nombre: body.nombre,
    //     descrip: body.descripcion,
    // });

    Categoria.findByIdAndUpdate(
        id, { new: true, runValidators: true },
        (err, categoriaDB) => {
            // return res.json({
            //     id: categoriaDB.id,
            //     nombre: categoriaDB.nombre,
            //     descripcion: categoriaDB.descripcion,
            // });

            if (err) {
                res.status(400).json({
                    ok: false,
                    err,
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB,
            });
        }
    );
});

//=======================================
//Borrar categorías
//Solo un admin puede borrar la categoría
//=======================================
app.delete("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    //Esta línea es para borrar físicamente un registro
    Categoria.findByIdAndDelete(id, (err, categoriaBorrada) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!categoriaBorrada) {
            res.status(400).json({
                ok: false,
                err: {
                    message: "Categoría no encontrada",
                },
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada,
        });
    });
});

module.exports = app;