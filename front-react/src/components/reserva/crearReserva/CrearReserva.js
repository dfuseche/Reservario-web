import React from "react";
import Steps from "rsuite/Steps";
import { useParams } from "react-router";
import { useForm } from "../../../hooks/useForm";
import { BrowserRouter as Navigate, useNavigate } from "react-router-dom";
import "./CrearReserva.css";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const CrearReserva = () => {
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
    idRestaurante: "",
    idEvento: "",
    idCentroTuristico: "",
    numeroPersonas: "",
    medioDePago: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const idEstablecimiento = useParams().id;
  const tipo = useParams().tipo;

  function darBackRoute() {
    if (tipo === "centroTuristico") {
      return "centrosturisticos";
    } else if (tipo === "evento") {
      return "eventos";
    } else {
      return "restaurantes";
    }
  }

  let backRoute = darBackRoute();

  const { numeroPersonas, medioDePago, fechaInicio, fechaFin } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let varidRestaurante = null;
    let varidEvento = null;
    let varidCentroTuristico = null;

    if (tipo === "restaurante") {
      varidRestaurante = idEstablecimiento;
    } else if (tipo === "evento") {
      varidEvento = idEstablecimiento;
    } else {
      varidCentroTuristico = idEstablecimiento;
    }

    const nuevaReserva = {
      idRestaurante: varidRestaurante,
      idEvento: varidEvento,
      idCentroTuristico: varidCentroTuristico,
      numeroPersonas: numeroPersonas,
      medioDePago: medioDePago,
      fechaInicio: fechaInicio + ":00.000+00:00",
      fechaFin: fechaFin + ":00.000+00:00",
    };

    const domain = window.location.origin;
    console.log(domain);

    await fetch(domain + "/api/reservas/", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaReserva),
    }).then((resp) => {
      console.log(resp.status);
      switch (resp.status) {
        case 400:
          alert("Error: datos invalidos");
          break;
        case 404:
          alert("Error interno del sistema");
          break;
        default:
          alert("Reserva realizada con exito!");
          navigate("/verReservas");
      }
    });
  };

  // Configuracion del calendario
  var today = new Date();
  const dateToday = today.toISOString().substring(0, 11) + "00:00";

  return (
    <>
      <div className="steps-container">
        <Steps current={2}>
          <Steps.Item title="Selecciona el tipo de establecimiento" />
          <Steps.Item title="Selecciona el establecimiento" />
          <Steps.Item title="Ingresa los datos de la reserva" />
        </Steps>
      </div>
      <div id="header-hacer-reserva">
        <h2>
          <FormattedMessage id="HacerReserva" />
        </h2>
      </div>
      <div id="seccion-form-hacer-reserva">
        <form onSubmit={handleSubmit}>
          <table className="table" id="form-hacer-reserva">
            <tbody>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="CantidadPers" />:
                  </label>
                </td>
                <td>
                <FormattedMessage id="CantidadPers" >
                      {(placeholder)=> (
                  <input
                    id="numeroPersonas-hacer-reserva"
                    name="numeroPersonas"
                    placeholder={placeholder}
                    type="number"
                    autoComplete="off"
                    value={numeroPersonas}
                    onChange={handleInputChange}
                  />
                  )}
                  </FormattedMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="MedioPag" />:
                  </label>
                </td>
                <td>
                  
                  <select
                    name="medioDePago"
                    id="medioDePago-hacer-reserva"
                    onChange={handleInputChange}
                  >
                    <option value="Otras Franquicias">
                      Selecciona Tarjeta
                    </option>
                    <option value="Master Card">Master Card</option>
                    <option value="Visa">Visa</option>
                    <option value="Dinners Club">Dinners Club</option>
                    <option value="American Express">American Express</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="FechaInicio" />:
                  </label>
                </td>
                <td>
                  <input
                    id="fechaInicio-hacer-reserva"
                    type="datetime-local"
                    name="fechaInicio"
                    autoComplete="off"
                    value={fechaInicio}
                    min={dateToday}
                    onChange={handleInputChange}
                  />
                  <span className="validity"></span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <FormattedMessage id="FechaFin" />:
                  </label>
                </td>
                <td>
                  <input
                    id="fechaFin-hacer-reserva"
                    type="datetime-local"
                    name="fechaFin"
                    autoComplete="off"
                    value={fechaFin}
                    min={dateToday}
                    onChange={handleInputChange}
                  />
                  <span className="validity"></span>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="submit-hacer-reserva">
                    <FormattedMessage id="Reservar" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="container_back_button">
        <Link to={"/" + backRoute}>
          <button className="btn_back">
            {"<"} &nbsp; <FormattedMessage id="back" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default CrearReserva;
