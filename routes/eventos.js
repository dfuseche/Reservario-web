const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Evento = require("../controllers/evento.controller");

router.get("/", function (req, res) {
  Evento.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  Evento.findOne(req.params.id).then((result) => {
    if (result === null)
    {
      return res.status(404).send("The Evento with the given id was not found.");
    }
    res.send(result);
  });
});

router.post("/", function (req, res) {
  const { error } = validateEvento(req.body);

  if (error)
  {
    return res.status(400).send(error.details[0].message);
  }

  const { nit, nombre, direccion, correo, telefono, descripcion, tipoDeEvento, capacidad, rate } = req.body;

  Evento.insertOne({ nit, nombre, direccion, correo, telefono, descripcion, tipoDeEvento, capacidad, rate }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateEvento(req.body);
  if (error)
  {
    return res.status(400).send(error.details[0].message);
  }

  Evento.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0)
    {
      return res.status(404).send("The Evento with the given id was not found.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  Evento.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0)
    {
      return res.status(404).send("The Evento with the given id was not found.");
    }
    res.status(204).send();
  });
});

const validateEvento = (evento) => {
  const schema = Joi.object({
    nit: Joi.number().required(),
    nombre: Joi.string().min(3).max(40).required(),
    direccion: Joi.string().min(10).max(30).required(),
    correo: Joi.string().min(10).max(40),
    telefono: Joi.number(),
    descripcion: Joi.string().min(10).max(80),
    tipoDeEvento: Joi.string().min(3).max(30).required(),
    capacidad: Joi.number().required(),
    rate: Joi.number()
  });

  return schema.validate(evento);
};

module.exports = router;
