import React, { useState, useEffect } from "react";
import Steps from "rsuite/Steps";
import "./CentrosTuristicos.css";
import { Tarjeta } from "../tarjeta/Tarjeta";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function CentrosTuristicos() {
  let [centros, setCentros] = useState(null);
  let [centrosDisp, setCentrosDisp] = useState(null);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("centrosTuristicos") === null) {
        setCentros("Loading...");
        setCentrosDisp("Loading...");
      } else {
        setCentros(JSON.parse(localStorage.getItem("centrosTuristicos")));
        setCentrosDisp(JSON.parse(localStorage.getItem("centrosTuristicos")));
      }
    } else {
      fetch("api/centroturistico/")
        .then((response) => response.json())
        .then((data) => {
          setCentros(data);
          setCentrosDisp(data);
          localStorage.setItem("centrosTuristicos", JSON.stringify(data));
        });
    }
  }, []);

  const filterCapacity = (e) => {
    const personas = e.split("-");
    if (personas.length === 1) {
      if (personas[0] === "any") {
        setCentrosDisp(centros);
      } else if (personas[0] === "10") {
        setCentrosDisp(centros.filter((centro) => centro.capacidad < 10));
      } else {
        setCentrosDisp(centros.filter((centro) => centro.capacidad > 30));
      }
    } else {
      const min = parseInt(personas[0]);
      const max = parseInt(personas[1]);
      setCentrosDisp(
        centros.filter(
          (centro) => centro.capacidad >= min && centro.capacidad <= max,
        ),
      );
    }
  };

  return (
    <>
      <div className="steps-container">
        <Steps current={1}>
          <Steps.Item title="Selecciona el tipo de establecimiento" />
          <Steps.Item title="Selecciona el centro turístico" />
          <Steps.Item title="Ingresa los datos de la reserva" />
        </Steps>
      </div>
      <div id="header-select-centro-turistico">
        <h2>
          <FormattedMessage id="SeleccionCentro" />
        </h2>
      </div>
      <div className="filter-bar">
        <label>Filtrar por:</label>
        <select
          className="select_filter-capacity"
          onChange={(e) => filterCapacity(e.target.value)}
        >
          <option value="any">Cualquier capacidad</option>
          <option value="10">Menor a 10 personas</option>
          <option value="10-20">Entre 10 y 20 personas</option>
          <option value="20-30">Entre 20 y 30 personas</option>
          <option value="30">Mas de 30 personas</option>
        </select>
      </div>
      <div className="container">
        {centrosDisp &&
          centrosDisp.map((element) => (
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
              tipo={"centroTuristico"}
              rate={element.rate}
            />
          ))}
      </div>
      <div className="empty_message">
        {centrosDisp?.length > 0 ? (
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

export default CentrosTuristicos;
