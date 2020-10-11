import React, { useState } from "react";
import PropTypes from "prop-types";

import { Icon } from "..";

/**
 * Acoording component
 */

const According = ({ title, content, children }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={`accor ${active ? "on" : ""}`}>
      <div className="accor-title halo" onClick={() => setActive(!active)}>
        <span>{title}</span>
        <div className="valign">
          <div className="accor-glyph arrowDown pin right" />
        </div>
      </div>
      <div className={`accor-detail`}>{children || content}</div>
    </div>
  );
};

According.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

According.defaultProps = {};

export default According;
