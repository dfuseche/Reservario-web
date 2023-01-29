import React from "react";
import { Link } from "react-router-dom";
import Rate from "rsuite/Rate";
import "rsuite/dist/rsuite.min.css";
import { FormattedMessage } from "react-intl";

export const Tarjeta = (props) => {
  const {
    nit,
    nombre,
    descripcion,
    img,
    capacidad,
    correo,
    direccion,
    telefono,
    id,
    tipo,
    rate,
  } = props;

  return (
    <div className="card" key={nit}>
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <img src={img} className="card-img-top" alt="..." />
        <p className="parrafo"> {descripcion} </p>
        <p className="card-text">
          <b>
            <FormattedMessage id="capacidad" />:
          </b>{" "}
          {capacidad} <br />
          <b>
            <FormattedMessage id="Email" />:{" "}
          </b>{" "}
          {correo} <br />
          <b>
            <FormattedMessage id="Direccion" />:{" "}
          </b>{" "}
          {direccion}
          <br />
          <b>
            <FormattedMessage id="Telefono" />:{" "}
          </b>
          {telefono} <br />
          <Rate readOnly defaultValue={parseInt(rate)} allowHalf />
        </p>
        <div className="bottonR">
          <Link to={`/crearReserva/${tipo}/${id}`}>
            <button type="button" className="btn btn-outline-danger" id={id}>
              <FormattedMessage id="ReservaYa" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
