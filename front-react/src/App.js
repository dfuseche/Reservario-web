import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import Logout from "./components/auth/logout/Logout";
import Restaurantes from "./components/restaurantes/restaurantes";
import Eventos from "./components/eventos/Evento";
import CentrosTuristicos from "./components/centrosTuristicos/CentrosTuristicos";
import TiposReserva from "./components/tiposReserva/TiposReserva";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import VerReservas from "./components/reserva/verReserva/VerReservas";
import CrearReserva from "./components/reserva/crearReserva/CrearReserva";
import Dashboard from "./components/dashboard/dashboard";
import PreguntasFrecuentes from "./components/preguntasFrecuentes/PreguntasFrecuentes";
import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
let ln = window.navigator.language.substring(0, 2);

let localeMes;

if (ln === "es") {
  localeMes = localeEsMessages;
} else {
  localeMes = localeEnMessages;
}

function App() {
  const [nombreUsuario, setNombreUsuario] = useState(
    localStorage.getItem("Nombre"),
  );

  return (
    <>
      <IntlProvider locale={ln} messages={localeMes}>
        <Router>
          <ScrollToTop />
          <Navbar {...{ nombreUsuario }} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/preguntasFrecuentes"
              element={<PreguntasFrecuentes />}
            />
            <Route
              path="/register"
              element={<Register {...{ setNombreUsuario }} />}
            />
            <Route
              path="/login"
              element={<Login {...{ setNombreUsuario }} />}
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/logout"
              element={<Logout {...{ setNombreUsuario }} />}
            />
            <Route
              path="/tiposreserva"
              element={
                <PrivateRoute>
                  <TiposReserva />
                </PrivateRoute>
              }
            />
            <Route
              path="/centrosturisticos"
              element={
                <PrivateRoute>
                  <CentrosTuristicos />
                </PrivateRoute>
              }
            />
            <Route
              path="/eventos"
              element={
                <PrivateRoute>
                  <Eventos />
                </PrivateRoute>
              }
            />
            <Route
              path="/restaurantes"
              element={
                <PrivateRoute>
                  <Restaurantes />
                </PrivateRoute>
              }
            />
            <Route
              path="/crearReserva/:tipo/:id"
              element={
                <PrivateRoute>
                  <CrearReserva />
                </PrivateRoute>
              }
            />
            <Route
              path="/verReservas"
              element={
                <PrivateRoute>
                  <VerReservas />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </Router>
      </IntlProvider>
    </>
  );
}

export default App;
