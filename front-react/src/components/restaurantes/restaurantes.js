import React, { useState, useEffect } from "react";
import Steps from "rsuite/Steps";
import { BrowserRouter as Navigate, useNavigate } from "react-router-dom";
import "./restaurante.css";
import { Tarjeta } from "../tarjeta/Tarjeta";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const Restaurantes = () => {
  let [restaurantes, setRestaurantes] = useState([]);
  let [restaurantesDisp, setRestaurantesDisp] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("restaurantes") === null) {
        setRestaurantes("Loading...");
        setRestaurantesDisp("Loading...");
      } else {
        setRestaurantes(JSON.parse(localStorage.getItem("restaurantes")));
        setRestaurantesDisp(JSON.parse(localStorage.getItem("restaurantes")));
      }
    } else {
      fetch("api/restaurante/")
        .then((response) => response.json())
        .then((data) => {
          setRestaurantes(data);
          setRestaurantesDisp(data);
          localStorage.setItem("restaurantes", JSON.stringify(data));
        });
    }
  }, []);

  const filterCapacity = (e) => {
    const personas = e.split("-");
    if (personas.length === 1) {
      if (personas[0] === "any") {
        setRestaurantesDisp(restaurantes);
      } else if (personas[0] === "20") {
        setRestaurantesDisp(
          restaurantes.filter((evento) => evento.capacidad < 20),
        );
      } else {
        setRestaurantesDisp(
          restaurantes.filter((evento) => evento.capacidad > 1000),
        );
      }
    } else {
      const min = parseInt(personas[0]);
      const max = parseInt(personas[1]);
      setRestaurantesDisp(
        restaurantes.filter(
          (evento) => evento.capacidad >= min && evento.capacidad <= max,
        ),
      );
    }
  };

  let linkImagen =
    "https://d500.epimg.net/cincodias/imagenes/2021/01/07/lifestyle/1610013278_270303_1610013536_noticia_normal.jpg";
  return (
    <>
      <div className="steps-container">
        <Steps current={1}>
          <Steps.Item title="Selecciona el tipo de establecimiento" />
          <Steps.Item title="Selecciona el restaurante" />
          <Steps.Item title="Ingresa los datos de la reserva" />
        </Steps>
      </div>
      <div id="header-select-restaurante">
        <h2>
          <FormattedMessage id="SelecionRes" />
        </h2>
      </div>
      <div className="filter-bar">
        <label>Filtrar por:</label>
        <select
          className="select_filter-capacity"
          onChange={(e) => filterCapacity(e.target.value)}
        >
          <option value="any">Cualquier capacidad</option>
          <option value="100">Menor a 100 personas</option>
          <option value="100-250">Entre 100 y 250 personas</option>
          <option value="250-500">Entre 250 y 500 personas</option>
          <option value="500">Mas de 500 personas</option>
        </select>
      </div>
      <div className="container">
        {restaurantesDisp.map((element) => (
          <Tarjeta
            key={element._id}
            nit={element.nit}
            img={linkImagen}
            nombre={element.nombre}
            descripcion={element.descripcion}
            capacidad={element.capacidad}
            correo={element.correo}
            telefono={element.telefono}
            tipoDeRestaurante={element.tipoDeRestaurante}
            id={element._id}
            tipo={"restaurante"}
            rate={element.rate}
          />
        ))}
      </div>
      <div className="empty_message">
        {restaurantesDisp?.length > 0 ? (
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
};

export default Restaurantes;
