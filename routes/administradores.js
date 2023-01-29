const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Administrador = require("../controllers/administrador.controller");
const { checkToken } = require("../middlewares/jwt-validator");

router.get("/", checkToken, function (req, res) {
  Administrador.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", checkToken, function (req, res) {
  Administrador.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("The Administrador with the given id was not found.");
    }
    res.send(result);
  });
});

router.post("/", checkToken, function (req, res) {
  const { error } = validateAdministrador(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { nombre, cedula, telefono, correo } = req.body;
  Administrador.insertOne({ nombre, cedula, telefono, correo }).then(
    (result) => {
      res.send(result);
    },
  );
});

router.put("/:id", checkToken, function (req, res) {
  const { error } = validateAdministrador(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Administrador.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("The Administrador with the given id was not found.");
    }
    res.send(result);
  });
});

router.delete("/:id", checkToken, function (req, res) {
  Administrador.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("The Administrador with the given id was not found.");
    }
    res.status(204).send();
  });
});

const validateAdministrador = (administrador) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    cedula: Joi.number().required(),
    telefono: Joi.number(),
    correo: Joi.string().min(10).max(40),
  });

  return schema.validate(administrador);
};

module.exports = router;
