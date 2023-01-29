const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Mesa = require("../controllers/mesa.controller");

router.get("/", function (req, res) {
  Mesa.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  Mesa.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res.status(404).send("The Mesa with the given id was not found.");
    }
    res.send(result);
  });
});
router.post("/", function (req, res) {
  const { error } = validateMesa(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { id, capacidad } = req.body;

  Mesa.insertOne({ id, capacidad }).then((result) => {
    res.send(result);
  });
});

router.put("/:id", function (req, res) {
  const { error } = validateMesa(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Mesa.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res.status(404).send("The Mesa with the given id was not found.");
    }
    res.send(result);
  });
});
router.delete("/:id", function (req, res) {
  Mesa.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).send("The Mesa with the given id was not found.");
    }
    res.status(204).send();
  });
});

const validateMesa = (mesa) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    capacidad: Joi.number().required(),
  });

  return schema.validate(mesa);
};

module.exports = router;
