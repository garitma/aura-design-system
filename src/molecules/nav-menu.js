import React from "react";
import PropTypes from "prop-types";

/**
 * Menu
 */

const Menu = ({ children, container, className, ...props }) => {
  const classConnect = [className, "fluid"];

  if (container) {
    classConnect.push(container);
  }

  return (
    <div className={classConnect.join(" ").trim()} {...props}>
      <ul className="nav-list fluid">{children}</ul>
    </div>
  );
};

export default Menu;
