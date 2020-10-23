import React from "react";
import PropTypes from "prop-types";

const Image = ({className, subClassName, src, mode, placeholder, ...props}) => {

    const classConnect = [className]
    const subClassNameConnect = [subClassName]

    if(mode) {
        classConnect.push(mode)
    }

    return(
        <div className={classConnect.join(" ").trim()}>
            <img src={src} {...props} className={subClassNameConnect.join(" ").trim()} />
        </div>
    )
}

Image.propTypes = {
    mode: PropTypes.oneOf(["block-img", "mod-media"]),
    src: PropTypes.any
}

Image.defaultProps = {
    mode: "block-img",
};

export default Image