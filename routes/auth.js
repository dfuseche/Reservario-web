const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller");

// Login
router.post("/login", async function (req, res) {
  const response = await login(req.body);
  if (response.success) {
    res.cookie("token", response.token, { httpOnly: true });
    res.status(200).send(response);
  } else {
    res.status(401).send(response);
  }
});

// Logout
router.get("/logout", async function (req, res) {
  res.cookie("token", "", { maxAge: 1 }, { httpOnly: true });
  res.status(200).send();
});

module.exports = router;
