import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ children, ...props }) => {
  return (
    <header {...props}>
      <nav id="Navbar" className="navbar">
        <div className="nav-wrapper">{children}</div>
      </nav>
    </header>
  );
};

export default Navbar;
