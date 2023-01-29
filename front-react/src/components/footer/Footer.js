import React from "react";
import { FormattedMessage } from "react-intl";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container bottom_border">
        <div className="row">
          <div className=" col-sm-4 col-md col-sm-4  col-12 col">
            <h5 className="headin5_amrc col_white_amrc pt2">
              <FormattedMessage id="Encuentranos" />
            </h5>
            <p className="mb10">
              <FormattedMessage id="EncuentranosBogota" />
            </p>
            <p>
              <i className="fa fa-phone"></i> +57-3228225845
            </p>
            <p>
              <i className="fa fa fa-envelope"></i> reservario@uniandes.edu.co
            </p>
          </div>
          <div className=" col-sm-4 col-md  col-6 col">
            <h5 className="headin5_amrc col_white_amrc pt2">
              <FormattedMessage id="LinksRapidos" />
            </h5>
            <ul className="footer_ul_amrc">
              <li>
                <Link className="nav-link" to="/home" id="inicio">
                  <FormattedMessage id="Inicio" />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/home" id="inicio">
                  <FormattedMessage id="Contacto" />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/home" id="inicio">
                  <FormattedMessage id="AcercaDeNosotros" />
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link"
                  to="/preguntasFrecuentes"
                  id="preguntasFrecuentes"
                >
                  <FormattedMessage id="PreguntasFrecuentes" />
                </Link>
              </li>
            </ul>
          </div>
          <div className=" col-sm-4 col-md  col-6 col">
            <h5 className="headin5_amrc col_white_amrc pt2">
              <FormattedMessage id="LinksRapidos" />
            </h5>
            <ul className="footer_ul_amrc">
              <li>
                <Link className="nav-link" to="/tiposreserva" id="tiposreserva">
                  <FormattedMessage id="Reservar" />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/restaurantes" id="restaurantes">
                  <FormattedMessage id="Restaurantes" />
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link"
                  to="/CentrosTuristicos"
                  id="CentrosTuristicos"
                >
                  <FormattedMessage id="CentrosTuristicos" />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/eventos" id="eventos">
                  <FormattedMessage id="Eventos" />
                </Link>
              </li>
            </ul>
          </div>
          <div className=" col-sm-4 col-md  col-12 col">
            <h5 className="headin5_amrc col_white_amrc pt2">
              <FormattedMessage id="SobreNosotros" />
            </h5>
            <ul className="footer_ul2_amrc">
              <li>
                <p>
                  <FormattedMessage id="SobreNostrosTxt" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="text-center">
          <FormattedMessage id="Footer" />
        </p>
        <ul className="social_footer_ul">
          <li>
            <a href="https://www.facebook.com/" title='Facebook Page'>
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" title='Twitter Page'>
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/feed/" title='LinkedIn Page'>
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" title='Instagram Page'>
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
        <div className="col-lg-3 col-sm-3">
          <img className="footer__pic" src="./img/Reservario.png" alt="Logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
