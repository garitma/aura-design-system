import React from "react";

import "../stylus/style.css";

export default {
  title: "Organisms/Header",
};

export const Default = () => (
  <header className="blue aura">
    <div className="smush aura">
      <ul className="nav-list">
        <li className="item logo-circle">
          <a className="">
            <div className="glyphsSprite logo" />
          </a>
        </li>
        <li></li>
      </ul>
    </div>
    <div>
      <h1 className="light centertxt">Title menu</h1>
    </div>
  </header>
);

export const WithNavMenu = () => (
  <header className="blue aura">
    <div className="smush aura">
      <ul className="nav-list">
        <li className="item logo-circle">
          <a className="">
            <div className="glyphsSprite logo" />
          </a>
        </li>
        <li className="mod"></li>
      </ul>
    </div>
    <div>
      <h1 className="light centertxt">Title menu</h1>
    </div>
    <nav className="fluid smosh">
      <ul className="nav-list fluid flowx">
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
      </ul>
    </nav>
  </header>
);

export const WithNavMenuWithRightButton = () => (
  <header className="blue aura">
    <div className="smush aura">
      <ul className="nav-list">
        <li className="item logo-circle">
          <a className="">
            <div className="glyphsSprite logo" />
          </a>
        </li>
        <li className="mod">
          <a className="button-link">
            <div className="glyphsSprite menu" />
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h1 className="light centertxt">Title menu</h1>
    </div>
    <nav className="fluid smosh">
      <ul className="nav-list fluid flowx">
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
      </ul>
    </nav>
  </header>
);

export const WithNavMenuWithRightButtonWithBackground = () => (
  <header
    className="aura"
    style={{
      backgroundImage:
        "url(https://images.prismic.io/garitma/a1b3faf2-cdb0-4bc4-b515-877c0da12a96_header_aura_design_system_garitma.jpg?auto=compress,format)",
    }}
  >
    <div className="smush aura">
      <ul className="nav-list">
        <li className="item logo-circle">
          <a className="">
            <div className="glyphsSprite logo" />
          </a>
        </li>
        <li className="mod">
          <a className="button-link">
            <div className="glyphsSprite menu" />
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h1 className="light centertxt">Title menu</h1>
    </div>
    <nav className="fluid smosh">
      <ul className="nav-list fluid flowx">
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
      </ul>
    </nav>
  </header>
);

export const WithNavMenuWithRightButtonWithBackgroundWithOpen = () => (
  <header
    className="aura anchor"
    style={{
      backgroundImage:
        "url(https://images.prismic.io/garitma/a1b3faf2-cdb0-4bc4-b515-877c0da12a96_header_aura_design_system_garitma.jpg?auto=compress,format)",
    }}
  >
    <div className="smush aura">
      <ul className="nav-list">
        <li className="item logo-circle">
          <a className="">
            <div className="glyphsSprite logo" />
          </a>
        </li>
        <li className="mod">
          <a className="button-link">
            <div className="glyphsSprite menu" />
          </a>
        </li>
      </ul>
    </div>
    <div className="smush anchor">
      <ul className="mod-detail pin right aureole one">
        <li>
          <a className="button-menu"> Dropdown menu item</a>
        </li>
        <li>
          <a className="button-menu"> Dropdown menu item</a>
        </li>
      </ul>
    </div>
    <div>
      <h1 className="light centertxt">Title menu</h1>
    </div>
    <nav className="fluid smosh">
      <ul className="nav-list fluid flowx">
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
        <li className="item p0">
          <a className="button-menu">Menu item</a>
        </li>
      </ul>
    </nav>
  </header>
);
