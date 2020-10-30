import React from "react";
import PropTypes from "prop-types";

/**
 * Header
 */

const Header = ({ text, children, ...props }) => {
  return (
    <div className="header blue" {...props}>
      <div className="halo smash mb0 light">
        {text && <h1 className="content-center centertxt layer ">{text}</h1>}
        {children}
      </div>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string
};

Header.defaultProps = {};

export default Header;
