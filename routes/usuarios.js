const express = require("express");
const router = express.Router();
const Joi = require("joi");

const usuario = require("../controllers/usuario.controller");
const Usuario = require("../controllers/usuario.controller");

router.get("/", function (req, res) {
  Usuario.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res) {
  Usuario.findOne(req.params.id).then((result) => {
    if (result === null) {
      return res
        .status(404)
        .send("The Usuario with the given id was not found.");
    }
    res.send(result);
  });
});

router.post("/", async function (req, res) {
  const { error } = validateUsuario(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const result = await createUser(req.body);
    if (result.success) {
      res.cookie("token", result.token, { httpOnly: true });
      res.status(201).send(result);
    } else {
      res.status(401).send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", function (req, res) {
  const { error } = validateUsuario(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  usuario.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send("The Usuario with the given id was not found.");
    }
    res.send(result);
  });
});

router.delete("/:id", function (req, res) {
  Usuario.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send("The Usuario with the given id was not found.");
    }
    res.status(204).send();
  });
});

const validateUsuario = (usuario) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    cedula: Joi.number().required(),
    telefono: Joi.number().required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    mediosdepago: Joi.array(),
  });

  return schema.validate(usuario);
};

module.exports = router;
