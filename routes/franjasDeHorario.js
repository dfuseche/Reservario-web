const express = require("express");
const router = express.Router();
const Joi = require("joi");
const FranjaDeHorario = require("../controllers/franjaDeHorario.controller");

router.get("/", function (req, res) {
  FranjaDeHorario.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  FranjaDeHorario.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("La franja de horario con el id dado no fue encontrada.");
    }
    res.send(result);
  });
});

router.post("/", function (req, res) {
  const { error } = validateFranjaDeHorario(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { horaApertura, horaCierre, capacidadTotal, capacidadActual } =
    req.body;
  FranjaDeHorario.insertOne({
    horaApertura,
    horaCierre,
    capacidadTotal,
    capacidadActual,
  }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateFranjaDeHorario(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  FranjaDeHorario.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("La franja de horario con el id dado no fue encontrada.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  FranjaDeHorario.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("La franja de horario con el id dado no fue encontrada.");
    }
    res.status(204).send();
  });
});

const validateFranjaDeHorario = (franjaDeHorario) => {
  const schema = Joi.object({
    horaApertura: Joi.date(),
    horaCierre: Joi.date(),
    capacidadTotal: Joi.number(),
    capacidadActual: Joi.number(),
  });

  return schema.validate(franjaDeHorario);
};

module.exports = router;
