const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Restaurante = require("../controllers/restaurante.controller");

router.get("/", function (req, res) {
  Restaurante.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  Restaurante.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("The Restaurante with the given id was not found.");
    }
    res.send(result);
  });
});

router.post("/", function (req, res) {
  const { error } = validateRestaurante(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {
    nit,
    nombre,
    direccion,
    correo,
    telefono,
    descripcion,
    tipoDeRestaurante,
    capacidad,
    rate,
  } = req.body;

  Restaurante.insertOne({
    nit,
    nombre,
    direccion,
    correo,
    telefono,
    descripcion,
    tipoDeRestaurante,
    capacidad,
    rate,
  }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateRestaurante(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  Restaurante.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("The Restaurante with the given id was not found.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  Restaurante.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("The Restaurante with the given id was not found.");
    }
    res.status(204).send();
  });
});

const validateRestaurante = (restaurante) => {
  const schema = Joi.object({
    nit: Joi.number().required(),
    nombre: Joi.string().min(3).max(40).required(),
    direccion: Joi.string().min(10).max(30).required(),
    correo: Joi.string().min(10).max(40),
    telefono: Joi.number(),
    descripcion: Joi.string().min(10).max(80),
    tipoDeRestaurante: Joi.string().min(3).max(30).required(),
    capacidad: Joi.number().required(),
    numeroMesas: Joi.number().required(),
    entretenimiento: Joi.boolean().required().default(false),
    rate: Joi.number(),
  });

  return schema.validate(restaurante);
};

module.exports = router;
