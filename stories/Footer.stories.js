import React from "react";

import { Footer, Grid, Icon } from "../src/organisms/footer";
import "../stylus/style.css";

export default {
  title: "Organisms/Footer",
  component: Footer,
};

export const Default = () => (
  <Footer>
    <Grid col="two">
      <div className="one smosh">
        <div className="centertxt-small">
          <Icon className="logo" />
        </div>
        <p className="centertxt-small">
          © 2020 Garitma. Todos los derechos reservados
        </p>
        <ul className="nav-list">
          <li className="item">Terminos de uso</li>
          <li className="item">Políticas de privacidad</li>
        </ul>
      </div>
      <div className="two smosh">
        <ul className="nav-list">
          <li className="item">
            <Icon sprite="instagram" />
          </li>
          <li className="item">
            <Icon sprite="twitter" />
          </li>
          <li className="item">
            <Icon sprite="facebook" />
          </li>
        </ul>
        <ul className="nav-list">
          <li className="item">Información de contacto</li>
        </ul>
      </div>
    </Grid>
  </Footer>
);
