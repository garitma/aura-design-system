import React from "react";
import PropTypes from "prop-types";

/**
 * Grid
 */

const Grid = ({ children, className, col, ...props }) => {
  const classConnect = ["aureole", className];

  if (col) {
    classConnect.push(col);
  }

  return (
    <div className={classConnect.join(" ")} {...props}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  col: PropTypes.oneOf(["one", "two", "field", "list", "tag", "feature-first"])
};

export default Grid;
