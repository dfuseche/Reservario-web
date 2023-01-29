import React from "react";
import "./preguntasFrecuentes.css";
import { FormattedMessage } from "react-intl";

const preguntasFrecuentes = () => {
  return (
    <div className="contend_pregunta">
      <div className="col-12">
        <h3>
          <FormattedMessage id="PreguntasFrecuentes" />
        </h3>
        <hr></hr>
        <h5>
          <FormattedMessage id="QueReservario" />
        </h5>
        <p>
          <FormattedMessage id="QueReservarioTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="ComoCrearCuenta" />
        </h5>
        <p>
          <FormattedMessage id="ComoCrearCuentaTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="ComoReservar" />
        </h5>
        <p>
          <FormattedMessage id="ComoReservarTxt" />
        </p>
        <ol>
          <li>
            <FormattedMessage id="LoguearConCuenta" />
          </li>
          <li>
            <FormattedMessage id="PaginPrincipalClick" />
          </li>
          <li>
            <FormattedMessage id="SeleccionarCateg" />
          </li>
          <li>
            <FormattedMessage id="ElegirInter" />
          </li>
          <li>
            <FormattedMessage id="MenuReserPerso" />
          </li>
          <li>
            <FormattedMessage id="DisfrutaReser" />
          </li>
        </ol>
        <br />
        <h5>
          <FormattedMessage id="PosibleRealizarReser" />
        </h5>
        <p>
          <FormattedMessage id="PosibleRealizarReserTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="ComoPagar" />
        </h5>
        <p>
          <FormattedMessage id="ComoPagarTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="ComoSaberTieneReser" />
        </h5>
        <p>
          <FormattedMessage id="ComoSaberTieneReserTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="ComoCancelar" />
        </h5>
        <p>
          <FormattedMessage id="ComoCancelarTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="SitiosRecomendados" />
        </h5>
        <p>
          <FormattedMessage id="SitiosRecomendadosTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="EnQueCiudades" />
        </h5>
        <p>
          <FormattedMessage id="EnQueCiudadesTxt" />
        </p>
        <br />
        <h5>
          <FormattedMessage id="PuedoAgregarRes" />
        </h5>
        <p>
          <FormattedMessage id="PuedoAgregarResTxt" />
        </p>
      </div>
    </div>
  );
};

export default preguntasFrecuentes;
