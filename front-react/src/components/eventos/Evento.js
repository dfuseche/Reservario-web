import React, { useState, useEffect } from "react";
import Steps from "rsuite/Steps";
import { Tarjeta } from "../tarjeta/Tarjeta";
import * as d3 from "d3";
import "./Eventos.css";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function Eventos() {
  let [eventos, setEventos] = useState(null);
  let [eventosDisp, setEventosDisp] = useState(null);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("eventos") === null) {
        setEventos("Loading...");
        setEventosDisp("Loading...");
      } else {
        setEventos(JSON.parse(localStorage.getItem("eventos")));
        setEventosDisp(JSON.parse(localStorage.getItem("eventos")));
      }
    } else {
      fetch("api/eventos/")
        .then((response) => response.json())
        .then((data) => {
          setEventos(data);
          setEventosDisp(data);
          localStorage.setItem("eventos", JSON.stringify(data));
        });
    }
  }, []);

  const filterCapacity = (e) => {
    const personas = e.split("-");
    if (personas.length === 1) {
      if (personas[0] === "any") {
        setEventosDisp(eventos);
      } else if (personas[0] === "20") {
        setEventosDisp(eventos.filter((evento) => evento.capacidad < 20));
      } else {
        setEventosDisp(eventos.filter((evento) => evento.capacidad > 1000));
      }
    } else {
      const min = parseInt(personas[0]);
      const max = parseInt(personas[1]);
      setEventosDisp(
        eventos.filter(
          (evento) => evento.capacidad >= min && evento.capacidad <= max,
        ),
      );
    }
  };

  return (
    <>
      <div className="steps-container">
        <Steps current={1}>
          <Steps.Item title="Selecciona el tipo de establecimiento" />
          <Steps.Item title="Selecciona el evento" />
          <Steps.Item title="Ingresa los datos de la reserva" />
        </Steps>
      </div>
      <div id="header-select-evento">
        <h2>
          <FormattedMessage id="SeleccionaEven" />
        </h2>
      </div>
      <div className="filter-bar">
        <label>Filtrar por:</label>
        <select
          className="select_filter-capacity"
          onChange={(e) => filterCapacity(e.target.value)}
        >
          <option value="any">Cualquier capacidad</option>
          <option value="20">Menor a 20 personas</option>
          <option value="20-100">Entre 20 y 100 personas</option>
          <option value="100-1000">Entre 100 y 1000 personas</option>
          <option value="1000">Mas de 1000 personas</option>
        </select>
      </div>
      <div className="container">
        {eventosDisp &&
          eventosDisp.map((element) => (
            <Tarjeta
              key={element._id}
              nit={element.nit}
              nombre={element.nombre}
              descripcion={element.descripcion}
              img={element.img}
              capacidad={element.capacidad}
              correo={element.correo}
              direccion={element.direccion}
              telefono={element.telefono}
              id={element._id}
              tipo={"evento"}
              rate={element.rate}
            />
          ))}
      </div>
      <div className="empty_message">
        {eventosDisp?.length > 0 ? (
          <p></p>
        ) : (
          <p>
            <FormattedMessage id="empty_message" />
          </p>
        )}
      </div>
      <div className="container_back_button">
        <Link to="/tiposreserva">
          <button className="btn_back">
            {"<"} &nbsp; <FormattedMessage id="back" />
          </button>
        </Link>
      </div>
    </>
  );
}

export default Eventos;
