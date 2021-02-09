import React from "react";
import PropTypes from "prop-types";

import Section from "../layout/section";

/**
 * Footer component
 */

const Footer = ({ children, ...props }) => {
  return (
    <footer {...props}>
      <Section passDiv>{children}</Section>
    </footer>
  );
};

export default Footer;
