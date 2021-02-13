import React from "react";

import Grid from "../src/layout/grid";
import Section from "../src/layout/section";
import Icon from "../src/atoms/icon";
import "../stylus/style.css";

export default {
  title: "Organisms/Footer"
};

export const Default = () => (
  <footer>
    <Section>
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
    </Section>
  </footer>
);
