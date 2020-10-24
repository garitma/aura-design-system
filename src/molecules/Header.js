import React from "react";
import PropTypes from "prop-types";

/**
 * Header
 */

 const Header = ({text, children, ...props}) => {
    return (
        <div className="header" {...props}>
            <div className="halo smash">
                {text &&
                    <h1 className="content-center light centertxt layer mb0">{text}</h1>
                }
                {children}
            </div>
        </div>
 )}

Header.propTypes = {
    text: PropTypes.string
};

Header.defaultProps = {
   
};