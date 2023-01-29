const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Puesto = require("../controllers/puesto.controller");

router.get("/", function (req, res) {
  Puesto.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  Puesto.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("El puesto con el id dado no fue encontrado.");
    }

    res.send(result);
  });
});

router.post("/", function (req, res) {
  const { error } = validatePuesto(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { numeroPuesto } = req.body;

  Puesto.insertOne({ numeroPuesto }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validatePuesto(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Puesto.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("El puesto con el id dado no fue encontrado.");
    }

    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  Puesto.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("El puesto con el id dado no fue encontrado.");
    }

    res.status(204).send();
  });
});

const validatePuesto = (puesto) => {
  const schema = Joi.object({
    numeroPuesto: Joi.number(),
  });

  return schema.validate(puesto);
};

module.exports = router;
