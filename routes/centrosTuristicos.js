const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CentroTuristico = require("../controllers/centroTuristico.controller");

router.get("/", function (req, res) {
  CentroTuristico.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  CentroTuristico.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("El centro turistico con el id dado no fue encontrado.");
    }
    res.send(result);
  });
});

router.post("/", function (req, res) {
  const { error } = validateCentroTuristico(req.body);
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
    capacidad,
    rate,
  } = req.body;

  CentroTuristico.insertOne({
    nit,
    nombre,
    direccion,
    correo,
    telefono,
    descripcion,
    capacidad,
    rate,
  }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateCentroTuristico(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  CentroTuristico.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("El centro turistico con el id dado no fue encontrado.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  CentroTuristico.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("El centro turistico con el id dado no fue encontrado.");
    }
    res.status(204).send();
  });
});

const validateCentroTuristico = (centroTuristico) => {
  const schema = Joi.object({
    nit: Joi.number(),
    nombre: Joi.string(),
    direccion: Joi.string(),
    correo: Joi.string(),
    telefono: Joi.number(),
    descripcion: Joi.string(),
    capacidad: Joi.number(),
    rate: Joi.number(),
  });
  return schema.validate(centroTuristico);
};

module.exports = router;
