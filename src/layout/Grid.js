import React from "react";
import PropTypes from "prop-types";

/**
 * Grid
 */

 const Grid = ({children, className, colums, ...props}) => {

    const classConnect = ["aureole", className]

    if (colums) {
        classConnect.push(colums);
    }

     return(
         <div className={classConnect.join(" ")} {...props}>
            {children}
         </div>
     )
 }

 Grid.propTypes = {
    colums: PropTypes.oneOf(["one", "two", "field", "list", "tag", "feature-first"]),
  };

 export default Grid