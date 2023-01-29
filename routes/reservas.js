const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Reserva = require("../controllers/reserva.controller");
const { checkToken } = require("../middlewares/jwt-validator");

router.get("/", function (req, res) {
  Reserva.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/usuario/", checkToken, async function (req, res) {
  const usuario = await getUserByUserName(req.decoded.username);
  const idUsuario = usuario._id;

  Reserva.findAllByUserId(idUsuario).then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  Reserva.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("La reserva con el id dado no fue encontrada.");
    }
    res.send(result);
  });
});

router.post("/", checkToken, async function (req, res) {
  const { error } = validateReserva(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const usuario = await getUserByUserName(req.decoded.username);
  const idUsuario = usuario._id;
  const {
    idRestaurante,
    idEvento,
    idCentroTuristico,
    numeroPersonas,
    medioDePago,
    fechaInicio,
    fechaFin,
  } = req.body;
  Reserva.insertOne({
    idUsuario,
    idRestaurante,
    idEvento,
    idCentroTuristico,
    numeroPersonas,
    medioDePago,
    fechaInicio,
    fechaFin,
  }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateReserva(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Reserva.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("La reserva con el id dado no fue encontrada.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  Reserva.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("La reserva con el id dado no fue encontrada.");
    }
    res.status(204).send();
  });
});

const validateReserva = (reserva) => {
  const schema = Joi.object({
    idRestaurante: Joi.string().allow(null),
    idEvento: Joi.string().allow(null),
    idCentroTuristico: Joi.string().allow(null),
    numeroPersonas: Joi.number(),
    medioDePago: Joi.string(),
    fechaInicio: Joi.date(),
    fechaFin: Joi.date(),
  });

  return schema.validate(reserva);
};

module.exports = router;
