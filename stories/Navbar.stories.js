import React from "react";

import { Navbar, Header, Menu, Icon, Button } from "../src";
import "../stylus/style.css";

export default {
  title: "Organisms/Navbar",
  component: Navbar
};

export const Default = () => (
  <>
    <Navbar>
        <ul className="nav-list">
          <li className="item logo">
            <Icon className="logo" />
          </li>
          <li className="item">
            <div className="mod">
              <Button mode="link" label link>
                <Icon sprite="search" />
              </Button>
            </div>
          </li>
        </ul>
    </Navbar>
    <Header text="Header">
      <Menu>
        <li><Button label="Menu item" mode="menu" link/></li>
        <li><Button label="Menu item" mode="menu" link/></li>
        <li><Button label="Menu item" mode="menu" link/></li>
        <li><Button label="Menu item" mode="menu" link/></li>
      </Menu>
    </Header>
  </>
) 