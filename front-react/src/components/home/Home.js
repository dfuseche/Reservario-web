import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
const Home = () => {
  return (
    <>
      <div className="header">
        <div className="row">
          <div className="col-lg-6 col-sm-12 info__header">
            <div className="header__title">
              <FormattedMessage id="TituloPrincipal" />
              <br />
              <FormattedMessage id="EnUnSolo" />
              <span className="header__title__color">
                <FormattedMessage id="lugar" />
              </span>
            </div>
            <br />
            <div className="header__paragraph">
              <FormattedMessage id="ParrafoPrincipal" />
              <br /> <FormattedMessage id="ParrafoPrincipal2" />
            </div>
            <br />
            <div className="div__btn__reserve">
              <Link className="anchor-btn-reserve" to="/tiposreserva">
                <button className="btn-reserve my-2 my-sm-0 col-md-5 col-10">
                  <FormattedMessage id="ReservaYa" />
                </button>
              </Link>
              <Link className="anchor-btn-reserve" to="/verReservas">
                <button className="btn-see-reserves my-2 my-sm-0 col-md-5 col-10">
                  <FormattedMessage id="Misreservas" />
                </button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 img__header">
            <img
              loading="lazy"
              className="main__pic"
              src="./img/header_img.png"
              alt="Header"
            />
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="section__title">
          <FormattedMessage id="Categorias" />
        </div>
        <div className="section__main__title">
          <FormattedMessage id="Servicios" />
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-12 col-md-4 col__cat__card">
            <div className="cat__card">
              <img
                loading="lazy"
                className="cat__card__head__pic"
                src="./img/cat-1.png"
                alt="Service 1"
              />
              <div className="cat__card__body">
                <div className="cat__card__body__title">
                  <FormattedMessage id="Restaurantes" />
                </div>
                <div className="cat__card__body__text">
                  <FormattedMessage id="ResTxt" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 col__cat__card">
            <div className="cat__card">
              <img
                loading="lazy"
                className="cat__card__head__pic"
                src="./img/cat-2.png"
                alt="Service 2"
              />
              <div className="cat__card__body">
                <div className="cat__card__body__title">
                  <FormattedMessage id="CentrosTuristicos" />
                </div>
                <div className="cat__card__body__text">
                  <FormattedMessage id="CentrosTxt" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 col__cat__card">
            <div className="cat__card">
              <img
                loading="lazy"
                className="cat__card__head__pic"
                src="./img/cat-3.png"
                alt="Service 3"
              />
              <div className="cat__card__body">
                <div className="cat__card__body__title">
                  <FormattedMessage id="Eventos" />
                </div>
                <div className="cat__card__body__text">
                  <FormattedMessage id="EventosTxt" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="steps">
        <div className="row">
          <div className="col-lg-6 col-sm-12 img__steps">
            <img
              loading="lazy"
              className="steps__pic"
              src="./img/steps-images.png"
              alt="Steps"
            />
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="section__title">
              <FormattedMessage id="Facil" />
            </div>
            <div className="section__main__title__right">
              <FormattedMessage id="ReservaConNosotros" />
            </div>
            <div className="row element-step">
              <div className="col-lg-9 col-sm-9">
                <div className="element__step__title">
                  <FormattedMessage id="ServicioNecesitas" />
                </div>
                <div className="element__step__text">
                  <FormattedMessage id="ServNecTxt" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <img
                  loading="lazy"
                  className="element__steps__pic"
                  src="./img/step-1.png"
                  alt="Step 1"
                />
              </div>
              <div className="col-lg-9 col-sm-9">
                <div className="element__step__title">
                  <FormattedMessage id="EligeFecha" />
                </div>
                <div className="element__step__text">
                  <FormattedMessage id="EligeFechaTxt" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <img
                  loading="lazy"
                  className="element__steps__pic"
                  src="./img/step-2.png"
                  alt="Step 2"
                />
              </div>
              <div className="col-lg-9 col-sm-9">
                <div className="element__step__title">
                  <FormattedMessage id="DigitaDatos" />
                </div>
                <div className="element__step__text">
                  <FormattedMessage id="DigitaDatosTxt" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <img
                  loading="lazy"
                  className="element__steps__pic"
                  src="./img/step-3.png"
                  alt="Step 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact__us">
        <div className="square__contact__us">
          <div className="section__main__title">
            <FormattedMessage id="Contactanos" />
          </div>
          <br />
          <div className="contactus__paragraph">
            <FormattedMessage id="ContactTxt" />
          </div>
          <br />
          <form className="contactus__form">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <FormattedMessage id="NombreComp" >
                    {(placeholder)=> (
              <input
                type="text"
                className="form-control"
                placeholder={placeholder}
              />
              )}
              </FormattedMessage>
            </div>
            <br />
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
              <FormattedMessage id="Correo" >
                    {(placeholder)=> (
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                      />
              )}
              </FormattedMessage>
            </div>
            <br />
            <button type="submit" className="btn__contact__form col-md-8">
              <FormattedMessage id="Enviar" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
