const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mediodepago = require("../controllers/mediodepago.controller");

const MedioDePago = require("../controllers/mediodepago.controller");

router.get("/", function (req, res) {
  MedioDePago.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  MedioDePago.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("The Medio de pago with the given id was not found.");
    }
    res.send(result);
  });
});

router.post("/", function (req, res) {
  const { error } = validateMedioDePago(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { medioDePago, idusuario } = req.body;

  MedioDePago.insertOne({ medioDePago, idusuario }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateMedioDePago(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  mediodepago.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("The Medio de pago with the given id was not found.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  MedioDePago.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("The Medio de pago with the given id was not found.");
    }
    res.status(204).send();
  });
});

const validateMedioDePago = (mediodepago) => {
  const schema = Joi.object({
    medioDePago: Joi.string()
      .valid("EFECTIVO", "TARJETA DE CREDITO", "TARJETA DE DEBITO", "PSE")
      .required(),
    idusuario: Joi.string().required(),
  });

  return schema.validate(mediodepago);
};

module.exports = router;
