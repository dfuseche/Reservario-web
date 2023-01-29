import React from "react";
import { CardVerReservas } from "./CardVerReservas";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const VerReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("reservas") === null) {
        setReservas("Loading...");
      } else {
        setReservas(JSON.parse(localStorage.getItem("reservas")));
      }
    } else {
      getReservas();
    }
  }, []);

  const getReservas = async () => {
    const res = await fetch("api/reservas/usuario").then((resp) => resp.json());

    localStorage.setItem("reservas", JSON.stringify(res));
    setReservas(res);
  };

  return (
    <div id="header-ver-reservas-usuario">
      <h2>
        <FormattedMessage id="ReservasRealizadas" />
      </h2>
      <div id="seccion-lista-reservas-usuario">
        {reservas.length !== 0 ? (
          reservas?.map((reserva) => (
            <CardVerReservas key={reserva._id} reserva={reserva} />
          ))
        ) : (
          <h4>
            <FormattedMessage id="NoReservas" />
          </h4>
        )}
      </div>
    </div>
  );
};

export default VerReservas;
