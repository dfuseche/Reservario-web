const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usuarioRouter = require("./routes/usuarios");
const mediodepagoRouter = require("./routes/mediodepago");
const eventosRouter = require("./routes/eventos");
const administradoresRouters = require("./routes/administradores");
const reservaRouter = require("./routes/reservas");
const franjaDeHorarioRouter = require("./routes/franjasDeHorario");
const puestoRouter = require("./routes/puestos");
const centroTuristicoRouter = require("./routes/centrosTuristicos");
let authRouter = require("./routes/auth");
const restauranteRouter = require("./routes/restaurante");
const mesaRouter = require("./routes/mesa");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front-noframework/public")));

app.use("/", indexRouter);

app.use("/api/usuarios", usuarioRouter);
app.use("/api/administradores", administradoresRouters);
app.use("/api/eventos", eventosRouter);
app.use("/api/reservas", reservaRouter);
app.use("/api/puestos", puestoRouter);
app.use("/api/centroturistico", centroTuristicoRouter);
app.use("/api/franjasDeHorario", franjaDeHorarioRouter);
app.use("/api/mediodepagos", mediodepagoRouter);
app.use("/auth", authRouter);
app.use("/api/mesa", mesaRouter);
app.use("/api/restaurante", restauranteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
