import React from "react";
import Steps from "rsuite/Steps";
import { Link } from "react-router-dom";
import Carousel from "../carousel/carousel";
import { SliderData } from "../Data/SliderData";
import "./TiposReserva.css";
import { FormattedMessage } from "react-intl";

function TiposReserva() {
  return (
    <>
      <div className="steps-container">
        <Steps current={0}>
          <Steps.Item title="Selecciona el tipo de establecimiento" />
          <Steps.Item title="Selecciona el establecimiento" />
          <Steps.Item title="Ingresa los datos de la reserva" />
        </Steps>
      </div>
      <div>
        <Carousel slides={SliderData} />
      </div>
      <div className="container__tipo">
        <Link to="/centrosturisticos">
          <button className="btn__tipo">
            <FormattedMessage id="CentrosTuristicos" />
          </button>
        </Link>
        <Link to="/eventos">
          <button className="btn__tipo">
            <FormattedMessage id="Eventos" />
          </button>
        </Link>
        <Link to="/restaurantes">
          <button className="btn__tipo">
            <FormattedMessage id="Restaurantes" />
          </button>
        </Link>
      </div>
      <div className="container_back_button">
        <Link to="/home">
          <button className="btn_back">
            {"<"} &nbsp; <FormattedMessage id="back_home" />
          </button>
        </Link>
      </div>
    </>
  );
}

export default TiposReserva;
