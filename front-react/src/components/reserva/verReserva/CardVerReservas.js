import React from "react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

export const CardVerReservas = (props) => {
  const [establecimiento, setEstablecimiento] = useState(null);

  useEffect(() => {
    getEstablecimiento();
  }, []);

  function eliminarReserva(idReserva) {
    var resultado = window.confirm(
      "Estas seguro que deseas eliminar la reserva?",
    );
    if (resultado === true) {
      fetch("api/reservas/" + idReserva, { method: "DELETE" }).then(() =>
        window.location.reload(false),
      );
      window.alert("Reserva eliminada satisfactoriamente");
    }
  }

  const getEstablecimiento = async () => {
    let varestablecimiento = null;
    if (props.reserva.idRestaurante != null) {
      await fetch("api/restaurante/" + props.reserva.idRestaurante)
        .then((resp) => resp.json())
        .then((establecimiento) => {
          varestablecimiento = establecimiento;
        });
    } else if (props.reserva.idEvento != null) {
      await fetch("api/eventos/" + props.reserva.idEvento)
        .then((resp) => resp.json())
        .then((establecimiento) => {
          varestablecimiento = establecimiento;
        });
    } else {
      await fetch("api/centroTuristico/" + props.reserva.idCentroTuristico)
        .then((resp) => resp.json())
        .then((establecimiento) => {
          varestablecimiento = establecimiento;
        });
    }
    setEstablecimiento(varestablecimiento);
  };

  return (
    <div className="card card-ver-reservas">
      <div className="card-body">
        <h4 className="card-title">{establecimiento?.nombre}</h4>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <FormattedMessage id="CantidadPers" />: {props.reserva.numeroPersonas}
        </li>
        <li className="list-group-item">
          <FormattedMessage id="MedioPag" />: {props.reserva.medioDePago}
        </li>
      </ul>
      <li className="list-group-item">
        <button
          type="button"
          className="btn btn-outline-danger"
          id={props.reserva._id}
          onClick={() => eliminarReserva(props.reserva._id)}
        >
          <FormattedMessage id="EliminarReserva" />
        </button>
      </li>
    </div>
  );
};
